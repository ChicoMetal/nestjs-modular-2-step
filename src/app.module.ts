import { HttpModule, HttpService, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { Environment } from './environment';
import config from './config';
import * as joi from 'joi';

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
        DATA_BASE_PORT: joi.number().required()
      }),
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
