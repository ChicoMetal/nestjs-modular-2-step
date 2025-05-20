import { Args, GqlExecutionContext, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { randomUUID } from 'crypto';
import { Category, Product } from '../../database/graphql';
import { ProductsService } from '../services/products.service';
import { JwtAuthGuard } from '../../guards/jwt-auth/jwt-auth.guard';
import { ExecutionContext, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../../guards/roleguard/role.guard';
import { Roles } from '../../decorators/roles.decorator';
import { CategoriesService } from '../services/categories.service';

@Resolver(() => Product)
@UseGuards(JwtAuthGuard)
export class ProductResolver {

  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
  ) {}


  @Query()
  products(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query()
  product(@Args('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Mutation()
  @Roles('admin')
  @UseGuards(RoleGuard)
  addProduct(_, { data }): Promise<Product> {
    return this.productsService.create(data);
  }


  @Mutation()
  updateProduct(_, { id, data }): Promise<Product> {
    return this.productsService.update(id, data);
  }

  @Mutation()
  @Roles('admin')
  @UseGuards(RoleGuard)
  deleteProduct(_, { id }): Promise<string> {
    return this.productsService.remove(id);
  }

  @ResolveField('category', () => Category)
  categoriesByProduct(@Parent() product: Product): Promise<Category> {
    return this.categoriesService.findOne(product['categoryId']);
  }


}
