import { Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { randomUUID } from 'crypto';
import { Category, Product } from '../../database/graphql';
import { CategoriesService } from '../services/categories.service';
import { JwtAuthGuard } from '../../guards/jwt-auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { RoleGuard } from '../../guards/roleguard/role.guard';
import { Roles } from '../../decorators/roles.decorator';
import { ProductsService } from '../services/products.service';

@Resolver(() => Category)
@UseGuards(JwtAuthGuard)
export class CategoryResolver {

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
  ) {}


  @Query(() => [Category])
  categories(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Query()
  category(_, {id}): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Mutation()
  @Roles('admin')
  @UseGuards(RoleGuard)
  addCategory(_, { data }): Promise<Category> {
    return this.categoriesService.create(data);
  }

  @Mutation()
  updateCategory(_, { id, data }): Promise<Category> {
    return this.categoriesService.update(id, data);
  }

  @Mutation()
  @Roles('admin')
  @UseGuards(RoleGuard)
  deleteCategory(_, { id }): Promise<string> {
    return this.categoriesService.remove(id);
  }

  @ResolveField('products', () => [Product])
  productsByCategory(@Parent() category: Category): Promise<Product[]> {
    return this.productsService.findByCategory(category.id);
  }
}
