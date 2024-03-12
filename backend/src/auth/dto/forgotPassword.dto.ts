import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordDto {
    @IsEmail({ message: 'Incorrect email' })
    @IsString()
    @IsNotEmpty({ message: 'The email is required' })
    email: string;
}

export default ForgotPasswordDto;