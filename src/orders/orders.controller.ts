import type { Request } from 'express';
import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { z } from 'zod';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { BadRequestError } from '../errors/bad-request.error';

const requestHeaders = z.object({
  authorization: z.string({ required_error: 'customerId is required' }),
});

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
    const { authorization } = requestHeaders.parse(req.headers);
    const customerId = authorization.split(' ')?.[1];
    if (!customerId) throw new BadRequestError('CustomerId is required');
    return this.ordersService.create(createOrderDto, customerId);
  }

  @Get()
  findAll(@Req() req: Request) {
    const { authorization } = requestHeaders.parse(req.headers);
    const customerId = authorization.split(' ')?.[1];
    if (!customerId) throw new BadRequestError('CustomerId is required');
    return this.ordersService.findAll(customerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    const { authorization } = requestHeaders.parse(req.headers);
    const customerId = authorization.split(' ')?.[1];
    if (!customerId) throw new BadRequestError('CustomerId is required');
    return this.ordersService.findOne(id, customerId);
  }
}
