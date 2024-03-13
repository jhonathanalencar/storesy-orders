import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: 'amqp://admin:admin@localhost:5672',
      queues: [
        {
          name: 'orders',
          exchange: 'amq.direct',
          routingKey: 'OrderCreated',
        },
      ],
    }),
  ],
  exports: [RabbitMQModule],
})
export class RabbitmqModule {}
