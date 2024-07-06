import { IsBoolean, IsString, Length, ValidateIf } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @Length(5, 100)
  name: string;
  @IsString()
  @Length(8, 100)
  password: string;
  @IsBoolean()
  @ValidateIf((object, value) => value !== null)
  isAdmin: boolean | false;
}
