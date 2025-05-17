import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { randomUUID } from 'crypto';
import { Brand } from '../../database/graphql';
import { BrandsService } from '../services/brands.service';

@Resolver()
export class BrandResolver {

  constructor(private readonly brandsService: BrandsService) {}


  @Query()
  brands(): Brand[] {
    return this.brandsService.findAll() as unknown as Brand[];
  }

  @Query()
  brand(_, {id}): Brand {
    return this.brandsService.findOne(id) as unknown as Brand;
  }

  @Mutation()
  addBrand(_, { data }): Brand {
    return this.brandsService.create(data) as unknown as Brand;
  }
}
