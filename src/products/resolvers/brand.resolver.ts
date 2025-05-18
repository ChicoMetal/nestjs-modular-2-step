import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { randomUUID } from 'crypto';
import { Brand } from '../../database/graphql';
import { BrandsService } from '../services/brands.service';

@Resolver()
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
  addBrand(_, { data }): Promise<Brand> {
    return this.brandsService.create(data);
  }

  @Mutation()
  updateBrand(_, { id, data }): Promise<Brand> {
    return this.brandsService.update(id, data);
  }

  @Mutation()
  deleteBrand(_, { id }): Promise<string> {
    return this.brandsService.remove(id);
  }
}
