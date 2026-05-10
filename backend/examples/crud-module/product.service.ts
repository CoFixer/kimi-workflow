import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(private readonly repository: ProductRepository) {}

  async create(dto: CreateProductDto) {
    try {
      const entity = this.repository.create(dto);
      return await this.repository.save(entity);
    } catch (error) {
      this.logger.error('Failed to create product', error);
      throw error;
    }
  }

  async findAll(page: number, limit: number) {
    return this.repository.findWithPagination(page, limit);
  }

  async findById(id: string) {
    const product = await this.repository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.findById(id);
    Object.assign(product, dto);
    return this.repository.save(product);
  }

  async remove(id: string) {
    const product = await this.findById(id);
    return this.repository.remove(product);
  }

  async search(query: string) {
    return this.repository.searchByName(query);
  }
}
