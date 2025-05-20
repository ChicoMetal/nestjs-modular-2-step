import { PartialType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';


export class UserResponse extends PartialType(User) {}

@ObjectType()
export class AuthTokenResponse {
  @Field()
  access_token: string;

  @Field(() => User)
  user: UserResponse;
}

@InputType()
export class LoginUserInput {
  @Field()
  userName: string;

  @Field()
  password: string;
}
