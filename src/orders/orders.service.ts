import { Injectable } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundError } from '../errors/not-found.error';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto, customerId: string) {
    const productIds = createOrderDto.items.map((item) => item.productId);
    const products = await this.prisma.product.findMany({
      where: {
        productId: {
          in: productIds,
        },
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
      order.addItem(product.productId, item.quantity, Number(product.price));
    });
    order.calculateTotal();
    await this.prisma.order.create({
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
        items: true,
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
    return order;
  }
}
