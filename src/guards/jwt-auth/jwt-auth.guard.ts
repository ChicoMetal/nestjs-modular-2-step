import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
