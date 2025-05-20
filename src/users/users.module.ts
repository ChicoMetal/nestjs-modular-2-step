import { Module } from '@nestjs/common';

import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UserResolver } from './resolver/user.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CustomerController, UsersController],
  providers: [
    CustomersService,
    UsersService,
    UserResolver
  ],
  exports: [UsersService],
})
export class UsersModule {}
