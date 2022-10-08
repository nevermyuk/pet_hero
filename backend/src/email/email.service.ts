import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { EmailParams } from '../utils/types';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);

    constructor(private readonly configService: ConfigService) {
        SendGrid.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'))
        this.logger.log("Configured Email Service")
    }


    async send(email: EmailParams) {
        const mail = {
            to: email.to,
            subject: email.subject,
            from: 'thepetheroesofsit@gmail.com',
            text: email.text,
            html: email.html,
        };
        const transport = await SendGrid.send(mail);
        this.logger.log(`E-Mail sent to ${mail.to}`);
        return transport;
    }
}
