import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CatalogService } from '../application/catalog.service';
import { Product } from '../domain/product.entity';
import { CreateProductInput } from '../application/dto/create-product.input';
import { UpdateProductInput } from '../application/dto/update-product.input';
import { ProductFilterInput } from '../application/dto/filter-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: CatalogService) {}

  @Mutation(() => Product, { name: 'createProduct' })
  createProduct(@Args('product') input: CreateProductInput): Promise<Product> {
    const product = new Product();
    product.name = input.name;
    product.description = input.description;
    product.price = input.price;
    product.stock = input.stock;

    return this.productService.createProduct(product);
  }

  @Query(() => [Product], { name: 'getAllProducts' })
  getAllProducts(
    @Args('filter', { nullable: true })
    filter?: ProductFilterInput,
  ): Promise<Product[]> {
    console.log("filter", filter);
    
    return this.productService.getAllProducts(filter);
  }

  @Query(() => Product, { nullable: true, name: 'getProductById' })
  getProductById(@Args('id') id: string): Promise<Product | null> {
    return this.productService.getProductById(id);
  }

  @Mutation(() => Product, { nullable: true, name: 'updateProduct' })
  updateProduct(
    @Args('id') id: string,
    @Args('productData') productData: UpdateProductInput,
  ): Promise<Product | null> {
    return this.productService.updateProduct(id, productData); 
  }

  @Mutation(() => Product, { nullable: true, name: 'deleteProduct' })
  async deleteProduct(@Args('id') id: string): Promise<Product | null> {
    const product = await this.productService.getProductById(id);
    if (!product) return null;

    const deleted = await this.productService.deleteProduct(id);

    return deleted ? product : null;
  }
}
