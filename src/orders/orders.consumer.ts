import { Injectable } from '@nestjs/common';
import {
  AmqpConnection,
  Nack,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';

import { OrdersService } from './orders.service';
import { OrderStatus, type OrderStatusType } from './entities/order.entity';
import { BadRequestError } from '../errors/bad-request.error';
import { CustomError } from '../errors/custom-error';

@Injectable()
export class OrderConsumer {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: 'PaymentCompleted',
    queue: 'payments',
  })
  async consume(msg: { orderId: string; status: OrderStatusType }) {
    console.log('Message:', msg);
    try {
      if (msg.status === OrderStatus.PAID) {
        await this.ordersService.pay(msg.orderId);
        return;
      }
      if (msg.status === OrderStatus.FAILED) {
        await this.ordersService.fail(msg.orderId);
        return;
      }
      throw new BadRequestError('status is invalid');
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        await this.amqpConnection.publish('amq.direct', 'PaymentFail', {
          error: error.message,
          orderId: msg.orderId,
        });
        return new Nack(false);
      }
      return new Nack(true);
    }
  }
}
