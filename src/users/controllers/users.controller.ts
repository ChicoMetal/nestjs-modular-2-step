import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Order } from '../entities/order.entity';
import { ConfigService, ConfigType } from '@nestjs/config';
import config from 'src/config';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService,
    @Inject('TASKS') private tasks: any,
    private configService: ConfigService,
    @Inject(config.KEY) private configServiceTypeOf: ConfigType<typeof config>) {

    console.log(this.configService.get('API_KEY'), this.tasks[0], this.configServiceTypeOf.apiKey);
  }


  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id);
  }

  @Get(':id/orders')
  getOrdersByUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOrderByUser(id);
  }
}
