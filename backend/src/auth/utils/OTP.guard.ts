import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class OTPGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<any> {
        const request = context.switchToHttp().getRequest()
        return request.session.isSecondFactorAuthenticated
    }
}
