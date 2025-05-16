import { Query, Resolver } from '@nestjs/graphql';
import { Brand, Category, Product } from './graphql';
import { randomUUID } from 'crypto';

@Resolver()
export class AppResolver {

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

  private readonly categoriesMock: Category[] = [
      {
        id: randomUUID(),
        createAt: Date(),
        updateAt: undefined,
        deleteAt: undefined,
        name: 'Category 1',
        description: 'Category 1',
      },
    ];
  private readonly brandsMock: Brand[] = [
      {
        id: randomUUID(),
        createAt: Date(),
        updateAt: undefined,
        deleteAt: undefined,
        name: 'Brand 1',
        image: 'https://i.imgur.com/U4iGx1j.jpeg',
        description: 'test',
      },
    ];

  // @Query()
  // helloWord() {
  //   return 'Hello world!'
  // }

  @Query()
  products(): Product[] {
    return this.productMock;
  }

  @Query()
  product(id: string): Product {
    return this.productMock[0];
  }

  @Query()
  categories(): Category[] {
    return this.categoriesMock;
  }

  @Query()
  category(id: string): Category {
    return this.categoriesMock[0];
  }

  @Query()
  brands(): Brand[] {
    return this.brandsMock;
  }

  @Query()
  brand(id: string): Brand {
    return this.brandsMock[0];
  }
}
