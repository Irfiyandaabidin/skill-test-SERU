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
import { VehicleBrandService } from './vehicle-brand.service';
import { Response } from 'express';
import { VehicleBrandDto } from './dto/vehicle-brand.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { IsAdminGuard } from 'src/auth/isadmin.guard';

@Controller('vehicle-brand')
export class VehicleBrandController {
  constructor(private readonly vehicleBrandService: VehicleBrandService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getVehicleBrands(
    @Res() response: Response,
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ): Promise<any> {
    try {
      const result = await this.vehicleBrandService.getVehicleBrand(
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
  async getVehicleBrand(@Res() response: Response, @Param('id') id: string) {
    try {
      const result = await this.vehicleBrandService.get(parseInt(id));
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successully get vehicle brand!',
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
  async createVehicleBrand(
    @Res() response: Response,
    @Body() body: VehicleBrandDto,
  ) {
    try {
      const result = await this.vehicleBrandService.create(body);
      return response.status(201).json({
        status: 'Ok!',
        message: 'Successully create vehicle brand!',
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
  async updateVehicleBrand(
    @Res() response: Response,
    @Body() body: VehicleBrandDto,
    @Param('id') id: string,
  ) {
    try {
      const result = await this.vehicleBrandService.update(body, parseInt(id));
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully update vehicle brand!',
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
  async deleteVehicleBrand(@Res() response: Response, @Param('id') id: string) {
    try {
      await this.vehicleBrandService.delete(parseInt(id));
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successully delete vehicle brand!',
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
