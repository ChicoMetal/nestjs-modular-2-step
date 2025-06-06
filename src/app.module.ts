import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { Environment } from './environment';
import config from './config';
import * as joi from 'joi';
import { MongoClient } from 'mongodb';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth-guard.guard';
import { AppResolver } from './app.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { PrismaModule } from './prisma/prisma.module';
import { SecurityModule } from './security/security.module';
import { GqlAuthGuard } from './guards/gqlauth/gqlauth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RoleGuard } from './guards/roleguard/role.guard';
import { resolvers as scalarResolvers, typeDefs as scalarTypeDefs } from 'graphql-scalars';
import { RegularExpression } from 'graphql-scalars';

const CategoryNameType = new RegularExpression('CategoryNameType', /^[a-zA-Z0-9]{3,8}/);
const Category = {
  // products: (parent, args, context, info) =>
  //   context.injector.get('ProductsResolver').productsByCategory(parent, args, context, info)
  // products: () => []
}
const resolverFunctions = {
  CategoryNameType,
  // Category
}
// const uriMongo = 'mongodb://localhost:27017';
// const client = new MongoClient(uriMongo);
// async function run() {
//   await client.connect();
//   const database = client.db('platzi-store');
//   const taskCollection = database.collection('tasks');
//   const tasks = await taskCollection.find().toArray();
//   console.log(tasks);
// }
// run();
@Module({
  imports: [
    UsersModule,
    ProductsModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: Environment[process.env.NODE_ENV] || '.env',
      load: [config],
      validationSchema: joi.object({
        API_KEY: joi.number().required(),
        DATA_BASE_NAME: joi.string().required(),
        DATA_BASE_PORT: joi.number().required(),
      }),
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY || 'my-secret-key-local-only',
      signOptions: { expiresIn: '1h' },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      typeDefs: [...scalarTypeDefs],
      resolvers: {...scalarResolvers, ...resolverFunctions},
      graphiql: false, // new to use instead of playground
      playground: false, //deprecated
      plugins: [ApolloServerPluginLandingPageLocalDefault()], // dev mode
    }),
    PrismaModule,
    SecurityModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthGuard,
    AppResolver,
    GqlAuthGuard,
    JwtAuthGuard,
    RoleGuard,
  ],
})
export class AppModule {}
