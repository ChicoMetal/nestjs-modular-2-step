import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { randomUUID } from 'crypto';
import { AuthTokenResponse, LoginUserInput } from '../../users/dtos/auth.dto';
import { AuthService } from '../services/auth/auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../guards/gqlauth/gqlauth.guard';
import { User } from '@prisma/client';

@Resolver()
export class AuthResolver {

  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthTokenResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('loginUserInput') loginUserInput: any, @Context() context): Promise<AuthTokenResponse> {
    return this.authService.getToken(loginUserInput.userName, loginUserInput.password);
  }

  @Mutation()
  signUp(@Args('loginUserInput') loginUserInput: any, @Context() context): Promise<User> {
    return this.authService.signup(loginUserInput);
  }

}
