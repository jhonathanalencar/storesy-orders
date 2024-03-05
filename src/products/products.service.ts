import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundError } from 'src/errors/not-found.error';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(productId: string) {
    const product = await this.prisma.product.findUnique({
      where: { productId },
    });
    if (!product) throw new NotFoundError('Product not found');
    return product;
  }

  update(productId: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      data: updateProductDto,
      where: { productId },
    });
  }

  remove(productId: string) {
    return this.prisma.product.delete({ where: { productId } });
  }
}
