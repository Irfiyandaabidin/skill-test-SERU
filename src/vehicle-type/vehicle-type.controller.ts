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
import { VehicleTypeService } from './vehicle-type.service';
import { Response } from 'express';
import { VehicleTypeDto } from './dto/vehicle-type.dto';
import { IsAdminGuard } from 'src/auth/isadmin.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('vehicle-type')
export class VehicleTypeController {
  constructor(private readonly vehicleTypeService: VehicleTypeService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getVehicleTypes(
    @Res() response: Response,
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ): Promise<any> {
    try {
      const result = await this.vehicleTypeService.getVehicleType(
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
  async getVehicleType(@Res() response: Response, @Param('id') id: string) {
    try {
      const result = await this.vehicleTypeService.get(parseInt(id));
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successully get vehicle Type!',
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
  async createVehicleType(
    @Res() response: Response,
    @Body() body: VehicleTypeDto,
  ) {
    try {
      const result = await this.vehicleTypeService.create(body);
      return response.status(201).json({
        status: 'Ok!',
        message: 'Successully create vehicle Type!',
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
  async updateVehicleType(
    @Res() response: Response,
    @Body() body: VehicleTypeDto,
    @Param('id') id: string,
  ) {
    try {
      const result = await this.vehicleTypeService.update(body, parseInt(id));
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully update vehicle Type!',
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
  async deleteVehicleType(@Res() response: Response, @Param('id') id: string) {
    try {
      await this.vehicleTypeService.delete(parseInt(id));
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successully delete vehicle Type!',
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
        message: err,
      });
    }
  }
}
