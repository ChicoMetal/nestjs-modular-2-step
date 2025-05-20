import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { randomUUID } from 'crypto';
import { Product } from '../../database/graphql';
import { ProductsService } from '../services/products.service';
import { JwtAuthGuard } from '../../guards/jwt-auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { RoleGuard } from '../../guards/roleguard/role.guard';
import { Roles } from '../../decorators/roles.decorator';

@Resolver()
@UseGuards(JwtAuthGuard)
export class ProductResolver {

  constructor(private readonly productsService: ProductsService) {}


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

}
