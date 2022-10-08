import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext) {
        // check the email and password
        const result = (await super.canActivate(context)) as boolean;
        // initialize the session
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return result;
    }
}
