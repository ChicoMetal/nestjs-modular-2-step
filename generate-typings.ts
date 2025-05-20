import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  typeDefs: [...scalarTypeDefs],
  path: join(process.cwd(), 'src/graphql.ts'),
  outputAs: 'class',
});
