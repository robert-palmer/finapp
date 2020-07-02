import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    // console.log(ctx);
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles);
    if (!roles) {
      return true;
    }
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
  }
}
