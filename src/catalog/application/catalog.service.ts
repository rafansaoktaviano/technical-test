import { Like, Repository } from 'typeorm';
import { Product } from '../domain/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductFilterInput } from './dto/filter-product.input';

export class CatalogService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }
  async getAllProducts(filter?: ProductFilterInput): Promise<Product[]> {
    const query = this.productRepository.createQueryBuilder('product');
    console.log(filter);

    if (filter?.keyword) {
      query.where(
        '(product.id LIKE :keyword OR product.name LIKE :keyword OR product.description LIKE :keyword)',
        { keyword: `%${filter.keyword}%` },
      );
    }

    return query.getMany();
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.productRepository.findOne({ where: { id } }) || null;
  }

  async updateProduct(
    id: string,
    productData: Partial<Product>,
  ): Promise<Product | null> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      return null;
    }

    Object.assign(product, productData);
    return this.productRepository.save(product);
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await this.productRepository.delete(id);
    return !!result?.affected;
  }
}
