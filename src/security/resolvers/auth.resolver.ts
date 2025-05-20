import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { randomUUID } from 'crypto';
import { AuthTokenResponse, LoginUserInput } from '../../users/dtos/auth.dto';
import { AuthService } from '../services/auth/auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../guards/gqlauth/gqlauth.guard';

@Resolver()
export class AuthResolver {

  constructor(private readonly authService: AuthService) {}


  @Mutation(() => AuthTokenResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('loginUserInput') loginUserInput: any, @Context() context): Promise<AuthTokenResponse> {
    const result = this.authService.getToken(loginUserInput.userName, loginUserInput.password);
    return result
  }

}
