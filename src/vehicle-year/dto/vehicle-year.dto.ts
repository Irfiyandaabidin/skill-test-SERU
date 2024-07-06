import { IsNumber } from 'class-validator';

export class VehicleYearDto {
  @IsNumber()
  year: number;
}
