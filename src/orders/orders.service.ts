import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundError } from '../errors/not-found.error';
import { Order } from './entities/order.entity';
import { calculateProductDiscount } from '../helpers/calculate-product-discount.helper';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async create(createOrderDto: CreateOrderDto, customerId: string) {
    const productIds = createOrderDto.items.map((item) => item.productId);
    const products = await this.prisma.product.findMany({
      where: {
        productId: {
          in: productIds,
        },
      },
      include: {
        discount: true,
      },
    });
    if (products.length !== productIds.length) {
      throw new NotFoundError('Product not found');
    }
    const order = Order.create(customerId);
    createOrderDto.items.map((item) => {
      const product = products.find(
        (product) => product.productId === item.productId,
      );
      order.addItem(
        product.productId,
        item.quantity,
        calculateProductDiscount(
          Number(product.price),
          product.discount?.percent ?? 0,
        ),
      );
    });
    order.calculateTotal();
    await this.prisma.$transaction(async (tx) => {
      await tx.order.create({
        data: {
          orderId: order.orderId,
          customerId,
          total: order.calculateTotal(),
          items: {
            createMany: {
              data: order.getItems(),
            },
          },
        },
      });
      await this.amqpConnection.publish('amq.direct', 'OrderCreated', {
        orderId: order.orderId,
        cardHash: createOrderDto.cardHash,
        total: order.getTotal(),
      });
    });
    return order;
  }

  async findAll(customerId: string) {
    const ordersData = await this.prisma.order.findMany({
      where: {
        customerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return ordersData.map((orderData) => {
      const order = Order.restore(
        orderData.orderId,
        orderData.customerId,
        orderData.status,
        Number(orderData.total),
        orderData.createdAt,
      );
      return order;
    });
  }

  async findOne(orderId: string, customerId: string) {
    const orderFound = await this.prisma.order.findUnique({
      where: {
        orderId_customerId: {
          orderId,
          customerId,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!orderFound) throw new NotFoundError('Order not found');
    const order = Order.restore(
      orderFound.orderId,
      orderFound.customerId,
      orderFound.status,
      Number(orderFound.total),
      orderFound.createdAt,
    );
    for (const item of orderFound.items) {
      order.addItem(item.productId, item.quantity, Number(item.price));
    }
    order.calculateTotal();
    return {
      orderId: order.orderId,
      customerId: order.customerId,
      status: order.getStatus(),
      total: order.getTotal(),
      createdAt: order.createdAt,
      items: orderFound.items.map((item) => {
        return {
          orderItemId: item.orderItemId,
          productId: item.productId,
          quantity: item.quantity,
          price: Number(item.price),
          name: item.product.name,
          imageUrl: item.product.imageUrl,
        };
      }),
    };
  }

  async pay(orderId: string) {
    const orderFound = await this.prisma.order.findUnique({
      where: {
        orderId,
      },
    });
    if (!orderFound) throw new NotFoundError('Order not found');
    const order = Order.restore(
      orderFound.orderId,
      orderFound.customerId,
      orderFound.status,
      Number(orderFound.total),
      orderFound.createdAt,
    );
    order.pay();
    await this.prisma.order.update({
      data: {
        status: order.getStatus(),
      },
      where: { orderId },
    });
  }

  async fail(orderId: string) {
    const orderFound = await this.prisma.order.findUnique({
      where: {
        orderId,
      },
    });
    if (!orderFound) throw new NotFoundError('Order not found');
    const order = Order.restore(
      orderFound.orderId,
      orderFound.customerId,
      orderFound.status,
      Number(orderFound.total),
      orderFound.createdAt,
    );
    order.fail();
    await this.prisma.order.update({
      data: {
        status: order.getStatus(),
      },
      where: { orderId },
    });
  }
}
