import { Inject, Injectable, Logger } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '../../users/entities/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  private readonly logger = new Logger(SessionSerializer.name);

  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    this.logger.debug('Serialize user');
    done(null, user.id);
  }

  async deserializeUser(payload: User, done: CallableFunction) {
    const user = await this.authService.findUser(payload.id);
    this.logger.debug({ user: user }, 'Deserialize user');
    return user ? done(null, user) : done(null, null);
  }
}
