import AdoptionStatus from '../enums/adoptionStatus.enum';
import PetGender from '../enums/petGender.enum';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsInt,
  IsBoolean,
  IsUrl,
} from 'class-validator';
export class CreatePetDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsString()
  species: string;

  @IsNotEmpty()
  @IsString()
  breed: string;

  @IsNotEmpty()
  @IsEnum(PetGender, {
    message: `Invalid gender. Value must be \[${Object.values(PetGender)}\]`,
  })
  gender: PetGender;
  @IsNotEmpty()
  @IsInt()
  age: number;

  @IsNotEmpty()
  @IsBoolean()
  hdb_approved: boolean;

  @IsNotEmpty()
  @IsBoolean()
  sterilized: boolean;

  @IsNotEmpty()
  @IsBoolean()
  vaccinated: boolean;

  @IsNotEmpty()
  @IsBoolean()
  microchipped: boolean;

  @IsNotEmpty()
  @IsEnum(AdoptionStatus, {
    message: `Invalid Adoption Status. Value must be \[${Object.values(
      AdoptionStatus,
    )}\]`,
  })
  status: AdoptionStatus;

  @IsNotEmpty()
  @IsString()
  story: string;

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;
}
