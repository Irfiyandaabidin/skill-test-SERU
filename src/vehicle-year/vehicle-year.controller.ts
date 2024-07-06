import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { VehicleYearService } from './vehicle-year.service';
import { Response } from 'express';
import { VehicleYearDto } from './dto/vehicle-year.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { IsAdminGuard } from 'src/auth/isadmin.guard';

@Controller('vehicle-year')
export class VehicleYearController {
  constructor(private readonly vehicleYearService: VehicleYearService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getVehicleYears(
    @Res() response: Response,
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ): Promise<any> {
    try {
      const result = await this.vehicleYearService.getVehicleYear(
        parseInt(page),
        parseInt(pageSize),
      );
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successully fetch data!',
        result: result,
        page: {
          page,
          pageSize,
        },
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Error!',
        message: 'Internal Server Error!',
      });
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getVehicleYear(@Res() response: Response, @Param('id') id: string) {
    try {
      const result = await this.vehicleYearService.get(parseInt(id));
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successully get vehicle Year!',
        result: result,
      });
    } catch (err) {
      if (err instanceof NotFoundException) {
        return response.status(404).json({
          status: 'Error!',
          message: err.message,
        });
      }
      return response.status(500).json({
        status: 'Error!',
        message: 'Internal Server Error!',
      });
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseGuards(IsAdminGuard)
  async createVehicleYear(
    @Res() response: Response,
    @Body() body: VehicleYearDto,
  ) {
    try {
      const result = await this.vehicleYearService.create(body);
      return response.status(201).json({
        status: 'Ok!',
        message: 'Successully create vehicle Year!',
        result: result,
      });
    } catch (err) {
      if (err instanceof NotFoundException) {
        return response.status(404).json({
          status: 'Error!',
          message: err.message,
        });
      }
      return response.status(500).json({
        status: 'Error!',
        message: 'Internal Server Error!',
      });
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UseGuards(IsAdminGuard)
  async updateVehicleYear(
    @Res() response: Response,
    @Body() body: VehicleYearDto,
    @Param('id') id: string,
  ) {
    try {
      const result = await this.vehicleYearService.update(body, parseInt(id));
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully update vehicle Year!',
        result: result,
      });
    } catch (err) {
      if (err instanceof NotFoundException) {
        return response.status(404).json({
          status: 'Error!',
          message: err.message,
        });
      }
      return response.status(500).json({
        status: 'Error!',
        message: 'Internal Server Error!',
      });
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @UseGuards(IsAdminGuard)
  async deleteVehicleYear(@Res() response: Response, @Param('id') id: string) {
    try {
      await this.vehicleYearService.delete(parseInt(id));
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successully delete vehicle Year!',
        result: null,
      });
    } catch (err) {
      if (err instanceof NotFoundException) {
        return response.status(404).json({
          status: 'Error!',
          message: err.message,
        });
      }
      return response.status(500).json({
        status: 'Error!',
        message: 'Internal Server Error!',
      });
    }
  }
}
