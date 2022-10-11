import { IsNotEmpty, IsString, MaxLength, MinLength, Validate } from 'class-validator';
import { CustomMatchPasswords } from '../../utils/CustomMatchPassword';
import { IsPasswordValid } from '../../utils/password.validator';

export class ResetPasswordDto {
    @IsString()
    @IsNotEmpty()
    token: string;

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

export default ResetPasswordDto;