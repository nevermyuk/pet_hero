import {
  IsBoolean, IsEnum,
  IsInt, IsNotEmpty, IsOptional, IsString, IsUrl
} from 'class-validator';
import AdoptionStatus from '../enums/adoptionStatus.enum';
import PetGender from '../enums/petGender.enum';
import { IsValidImageUrl } from '../validation/IsValidImageUrl';

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

  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  @IsValidImageUrl({
    message: 'URL $value is not a valid image Url.',
  })
  imageUrl: string;
}
