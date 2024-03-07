import { ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
