import { randomUUID } from 'node:crypto';

export class OrderItem {
  constructor(
    readonly orderItemId: string,
    readonly productId: string,
    readonly quantity: number,
    readonly price: number,
  ) {}

  static create(productId: string, quantity: number, price: number) {
    const orderItemId = randomUUID();
    return new OrderItem(orderItemId, productId, quantity, price);
  }
}
