import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import RequestWithUser from '../interface/requestWithUser.interface';

@Injectable()
export class EmailConfirmationGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ) {
        const request: RequestWithUser = context.switchToHttp().getRequest();

        if (!request.user?.isEmailConfirmed) {
            throw new UnauthorizedException('Confirm your email first');
        }

        return true;
    }
}