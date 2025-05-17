import { Module } from '@nestjs/common';

import { ProductsController } from './controllers/products.controller';
import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsService } from './services/products.service';
import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductResolver } from './resolvers/product.resolver';
import { BrandResolver } from './resolvers/brand.resolver';
import { CategoryResolver } from './resolvers/category.resolver';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
  ],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [
    ProductsService,
    BrandsService,
    CategoriesService,
    ProductResolver,
    BrandResolver,
    CategoryResolver,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
