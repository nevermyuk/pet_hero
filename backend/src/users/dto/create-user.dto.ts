import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { IsPasswordValid } from '../../utils/password.validator';
export class CreateUserDto {
  @MaxLength(250)
  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty({ message: 'The email is required' })
  email: string;

  @IsPasswordValid()
  @MinLength(10)
  @MaxLength(50)
  password: string;
}
