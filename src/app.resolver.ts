import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { AuthResponse } from './users/dtos/auth.dto';

@Resolver()
export class AppResolver {

  constructor(private readonly appService: AppService) {}

  @Query()
  testList(_, args): number[] {
    return args.elements;
  }

  @Mutation()
  login(email: string, password: string): Promise<AuthResponse> {
    return this.appService.auth(email, password);
  }
}
