import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(
    @Req() request: Request,
    @Res() response,
    @Body() registerDto: RegisterUserDto,
  ): Promise<any> {
    try {
      const result = await this.authService.register(registerDto);
      return response.status(201).json({
        status: 'Ok!',
        message: 'Successfully register!',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Error!',
        message: err.message,
      });
    }
  }

  @Post('/login')
  async login(@Res() response, @Body() loginDto: LoginUserDto): Promise<any> {
    try {
      const result = await this.authService.login(loginDto);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully login!',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Error!',
        message: 'Internal Server Error!',
      });
    }
  }
}
