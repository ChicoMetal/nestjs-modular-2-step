import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './controllers/auth/auth.controller';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './resolvers/auth.resolver';
import { JWTStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    AuthResolver,
    JWTStrategy,
  ],
  exports: [
    LocalStrategy,
    JWTStrategy,
  ],
  controllers: [AuthController]
})
export class SecurityModule {
}
