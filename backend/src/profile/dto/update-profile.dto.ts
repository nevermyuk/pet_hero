import Gender from '../enums/gender.enum';
import Property from '../enums/property.enum';
import {
  MinLength,
  MaxLength,
  IsPhoneNumber,
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from 'class-validator';
export class UpdateProfileDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  nationality: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(Gender, {
    message: `Invalid gender. Value must be \[${Object.values(Gender)}\]`,
  })
  gender: Gender;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  age: number;

  @IsOptional()
  @IsNotEmpty()
  @IsPhoneNumber('SG')
  mobile: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(6, {
    message:
      'Postal code is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(6, {
    message:
      'Postal code is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  postalCode: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(Property, {
    message: `Invalid residence type. Value must be \[${Object.values(
      Property,
    )}\]`,
  })
  residence_type: Property;
}
