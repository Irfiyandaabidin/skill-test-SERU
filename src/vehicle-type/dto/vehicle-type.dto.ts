import { IsNumber, IsString, Length } from 'class-validator';

export class VehicleTypeDto {
  @IsString()
  @Length(5, 100)
  name: string;

  @IsNumber()
  brandId: number;
}
