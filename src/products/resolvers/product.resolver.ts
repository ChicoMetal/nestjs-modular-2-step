import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { randomUUID } from 'crypto';
import { Product } from '../../database/graphql';
import { ProductsService } from '../services/products.service';

@Resolver()
export class ProductResolver {

  constructor(private readonly productsService: ProductsService) {}


  @Query()
  products(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query()
  product(_, {id}): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Mutation()
  addProduct(_, { data }): Promise<Product> {
    return this.productsService.create(data);
  }


  @Mutation()
  updateProduct(_, { id, data }): Promise<Product> {
    return this.productsService.update(id, data);
  }

  @Mutation()
  deleteProduct(_, { id }): Promise<string> {
    return this.productsService.remove(id);
  }

}
