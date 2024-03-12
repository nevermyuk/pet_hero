import { IsEmail, IsNotEmpty, MaxLength, MinLength, Validate } from 'class-validator';
import { CustomMatchPasswords } from '../../utils/CustomMatchPassword';
import { IsPasswordValid } from '../../utils/password.validator';
export class CreateUserDto {
  @MaxLength(250)
  @IsEmail({ message: 'Incorrect email' })
  @IsNotEmpty({ message: 'The email is required' })
  email: string;

  @IsPasswordValid()
  @MinLength(8)
  @MaxLength(50)
  password: string;

  @IsPasswordValid()
  @MinLength(8)
  @MaxLength(50)
  @Validate(CustomMatchPasswords, ['password'])
  confirmPassword: string;
}
