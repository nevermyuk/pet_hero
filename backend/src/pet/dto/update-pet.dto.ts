import AdoptionStatus from '../enums/adoptionStatus.enum';
import PetGender from '../enums/petGender.enum';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsInt,
  IsBoolean,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class UpdatePetDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  species: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  breed: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(PetGender, {
    message: `Invalid gender. Value must be \[${Object.values(PetGender)}\]`,
  })
  gender: PetGender;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  age: number;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  hdb_approved: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  sterilized: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  vaccinated: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  microchipped: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(AdoptionStatus, {
    message: `Invalid Adoption Status. Value must be \[${Object.values(
      AdoptionStatus,
    )}\]`,
  })
  status: AdoptionStatus;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  story: string;

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;
}
