import { Query, Resolver } from '@nestjs/graphql';
import { randomUUID } from 'crypto';
import { Category } from '../../database/graphql';

@Resolver()
export class CategoryResolver {

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


  @Query()
  categories(): Category[] {
    return this.categoriesMock;
  }

  @Query()
  category(_, {id}): Category {
    return this.categoriesMock[id];
  }

}
