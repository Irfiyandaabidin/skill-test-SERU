import { IsNumber, IsString, Length } from 'class-validator';

export class VehicleModelDto {
  @IsString()
  @Length(5, 100)
  name: string;
  @IsNumber()
  type_id: number;
}
