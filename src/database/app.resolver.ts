import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {

  @Query()
  testList(_, args): number[] {
    return args.elements;
  }

}
