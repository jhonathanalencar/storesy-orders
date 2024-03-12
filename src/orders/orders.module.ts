import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderConsumer } from './orders.consumer';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrderConsumer],
})
export class OrdersModule {}
