import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    return context.switchToHttp().getRequest().isAuthenticated();
  }
}
