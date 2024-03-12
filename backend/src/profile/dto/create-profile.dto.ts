import Gender from '../enums/gender.enum';
import Property from '../enums/property.enum';
import {
  MinLength,
  MaxLength,
  IsPhoneNumber,
  IsInt,
  IsString,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  nationality: string;

  @IsNotEmpty()
  @IsEnum(Gender, {
    message: `Invalid gender. Value must be \[${Object.values(Gender)}\]`,
  })
  gender: Gender;

  @IsNotEmpty()
  @IsInt()
  age: number;

  @IsNotEmpty()
  @IsPhoneNumber('SG')
  mobile: string;

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

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsEnum(Property, {
    message: `Invalid residence type. Value must be \[${Object.values(
      Property,
    )}\]`,
  })
  residence_type: Property;
}
