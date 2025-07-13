import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './domain/product.entity';
import { CatalogService } from './application/catalog.service';
import { ProductResolver } from './resolvers/catalog.resolver';

@Module({
  providers: [ProductResolver, CatalogService],
  imports: [TypeOrmModule.forFeature([Product])],
})
export class CatalogModule {}
