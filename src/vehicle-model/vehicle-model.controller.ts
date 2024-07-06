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
import { VehicleModelDto } from './dto/vehicle-model.dto';
import { VehicleModelService } from './vehicle-model.service';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { IsAdminGuard } from 'src/auth/isadmin.guard';

@Controller('vehicle-model')
export class VehicleModelController {
  constructor(private readonly vehicleModelService: VehicleModelService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getVehicleModels(
    @Res() response: Response,
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ): Promise<any> {
    try {
      const result = await this.vehicleModelService.getVehicleModel(
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

  @Post()
  @UseGuards(AuthGuard)
  @UseGuards(IsAdminGuard)
  async createVehicleModel(
    @Res() response: Response,
    @Body() body: VehicleModelDto,
  ) {
    try {
      const result = await this.vehicleModelService.create(body);
      return response.status(201).json({
        status: 'Ok!',
        message: 'Successully create vehicle model!',
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
        message: err.message,
      });
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UseGuards(IsAdminGuard)
  async updateVehicleModel(
    @Res() response: Response,
    @Body() body: VehicleModelDto,
    @Param('id') id: string,
  ) {
    try {
      const result = await this.vehicleModelService.update(body, parseInt(id));
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully update vehicle model!',
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
  async deleteVehicleModel(@Res() response: Response, @Param('id') id: string) {
    try {
      await this.vehicleModelService.delete(parseInt(id));
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully delete vehicle model!',
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
