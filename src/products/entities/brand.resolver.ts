import { Query, Resolver } from '@nestjs/graphql';
import { randomUUID } from 'crypto';
import { Brand } from '../../database/graphql';

@Resolver()
export class BrandResolver {

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


  @Query()
  brands(): Brand[] {
    return this.brandsMock;
  }

  @Query()
  brand(_, {id}): Brand {
    return this.brandsMock[id];
  }

}
