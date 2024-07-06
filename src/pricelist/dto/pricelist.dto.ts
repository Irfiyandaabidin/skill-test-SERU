import { IsNumber, IsString, Length } from 'class-validator';

export class PricelistDto {
  @IsString()
  @Length(5, 100)
  code: string;
  @IsNumber()
  price: number;
  @IsNumber()
  year_id: number;
  @IsNumber()
  model_id: number;
}
