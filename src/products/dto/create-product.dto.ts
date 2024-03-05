export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  discountId: string | null;
}
