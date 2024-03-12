import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateInterestDto {
  @IsInt()
  @IsNotEmpty()
  pet_id: number;
}
