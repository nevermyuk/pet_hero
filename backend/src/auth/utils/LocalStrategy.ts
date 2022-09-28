import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import LoginFailException from '../exceptions/loginFail.exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject('AUTH_SERVICE') private authService: AuthService) {
        super({ usernameField: 'email' })
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.authService.validateUserLocal(email, password);
        if (!user) {
            throw new LoginFailException();
        }
        return user;
    }
}
