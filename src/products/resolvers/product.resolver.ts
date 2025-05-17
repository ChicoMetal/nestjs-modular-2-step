import { Query, Resolver } from '@nestjs/graphql';
import { randomUUID } from 'crypto';
import { Product } from '../../database/graphql';
import { ProductsService } from '../services/products.service';

@Resolver()
export class ProductResolver {

  constructor(private readonly productsService: ProductsService) {}


  @Query()
  products(): Product[] {
    return this.productsService.findAll() as unknown as Product[];
  }

  @Query()
  product(_, {id}): Product {
    return this.productsService.findOne(id) as unknown as Product;
  }

}
