import { IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @Length(5, 100)
  name: string;
  @IsString()
  @Length(5, 100)
  password: string;
}
