import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';
import { Product } from './product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async findByCategory(categoryId: string) {
    return this.find({
      where: { categoryId },
      relations: ['category'],
    });
  }

  async searchByName(query: string) {
    return this.createQueryBuilder('product')
      .where('product.name ILIKE :query', { query: `%${query}%` })
      .leftJoinAndSelect('product.category', 'category')
      .getMany();
  }

  async findWithPagination(page: number, limit: number) {
    const [data, total] = await this.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { data, total, page, limit };
  }
}
