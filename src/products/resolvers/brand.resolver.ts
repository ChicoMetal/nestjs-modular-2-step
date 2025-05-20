import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { randomUUID } from 'crypto';
import { Brand } from '../../database/graphql';
import { BrandsService } from '../services/brands.service';
import { JwtAuthGuard } from '../../guards/jwt-auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { RoleGuard } from '../../guards/roleguard/role.guard';
import { Roles } from '../../decorators/roles.decorator';

@Resolver()
@UseGuards(JwtAuthGuard)
export class BrandResolver {

  constructor(private readonly brandsService: BrandsService) {}


  @Query()
  brands(): Promise<Brand[]> {
    return this.brandsService.findAll();
  }

  @Query()
  brand(_, {id}): Promise<Brand> {
    return this.brandsService.findOne(id);
  }

  @Mutation()
  @Roles('admin')
  @UseGuards(RoleGuard)
  addBrand(_, { data }): Promise<Brand> {
    return this.brandsService.create(data);
  }

  @Mutation()
  updateBrand(_, { id, data }): Promise<Brand> {
    return this.brandsService.update(id, data);
  }

  @Mutation()
  @Roles('admin')
  @UseGuards(RoleGuard)
  deleteBrand(_, { id }): Promise<string> {
    return this.brandsService.remove(id);
  }
}
