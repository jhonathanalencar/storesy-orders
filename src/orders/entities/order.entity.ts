import { randomUUID } from 'node:crypto';

import { OrderItem } from './order-item.entity';

export const OrderStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
} as const;

export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];

export class Order {
  private items: OrderItem[] = [];
  private tax: number = 20;

  constructor(
    readonly orderId: string,
    readonly customerId: string,
    readonly status: OrderStatusType,
    private total: number,
    readonly createdAt: Date,
  ) {}

  static create(customerId: string) {
    const orderId = randomUUID();
    return new Order(orderId, customerId, OrderStatus.PENDING, 0, new Date());
  }

  static restore(
    orderId: string,
    customerId: string,
    status: OrderStatusType,
    total: number,
    createdAt: Date,
  ) {
    return new Order(orderId, customerId, status, total, createdAt);
  }

  addItem(productId: string, quantity: number, price: number) {
    const orderItem = OrderItem.create(productId, quantity, price);
    this.items.push(orderItem);
  }

  getItems() {
    return this.items;
  }

  calculateTotal() {
    const total = this.items.reduce((acc, value) => {
      acc += value.price * value.quantity;
      return acc;
    }, 0 + this.tax);
    this.total = Math.floor(total * 100) / 100;
    return Math.floor(total * 100) / 100;
  }
}
