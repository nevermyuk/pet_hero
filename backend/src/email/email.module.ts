import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
    imports: [],
    controllers: [],
    providers: [{ provide: 'EMAIL_SERVICE', useClass: EmailService }]
})
export class EmailModule { }
