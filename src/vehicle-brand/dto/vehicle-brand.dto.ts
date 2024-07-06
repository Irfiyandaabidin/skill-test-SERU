import { IsString, Length } from 'class-validator';

export class VehicleBrandDto {
  @IsString()
  @Length(5, 100)
  name: string;
}
