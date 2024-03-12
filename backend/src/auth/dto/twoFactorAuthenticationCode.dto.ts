import { IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class TwoFactorAuthenticationCodeDto {
    @IsNumberString()
    @IsNotEmpty()
    @Length(6, 6)
    twoFactorAuthenticationCode: string;
}

export default TwoFactorAuthenticationCodeDto;