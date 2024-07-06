import { Controller, Get, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(@Res() response: Response): Promise<any> {
    try {
      const result = await this.usersService.getAllUsers();
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Ok!',
        message: 'Internal Server Error!',
      });
    }
  }
}
