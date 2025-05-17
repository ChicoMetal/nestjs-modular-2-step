import { Query, Resolver } from '@nestjs/graphql';
import { randomUUID } from 'crypto';
import { Product } from '../../database/graphql';

@Resolver()
export class ProductResolver {

  private readonly productMock: Product[] = [
      {
        id: randomUUID(),
        createAt: Date(),
        updateAt: undefined,
        deleteAt: undefined,
        name: 'Producto 1',
        description: 'lorem lorem',
        price: 10000,
        stock: 300,
        image: 'https://i.imgur.com/U4iGx1j.jpeg',
      },
    ];


  @Query()
  products(): Product[] {
    return this.productMock;
  }

  @Query()
  product(_, {id}): Product {
    return this.productMock[id];
  }

}
