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
import { PricelistDto } from './dto/pricelist.dto';
import { PricelistService } from './pricelist.service';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { IsAdminGuard } from 'src/auth/isadmin.guard';

@Controller('pricelist')
export class PricelistController {
  constructor(private readonly PricelistService: PricelistService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getPricelists(
    @Res() response: Response,
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ): Promise<any> {
    try {
      const result = await this.PricelistService.getPricelist(
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
  async createPricelist(@Res() response: Response, @Body() body: PricelistDto) {
    try {
      const result = await this.PricelistService.create(body);
      return response.status(201).json({
        status: 'Ok!',
        message: 'Successully create pricelist!',
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
  async updatePricelist(
    @Res() response: Response,
    @Body() body: PricelistDto,
    @Param('id') id: string,
  ) {
    try {
      const result = await this.PricelistService.update(body, parseInt(id));
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully update pricelist!',
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
  async deletePricelist(@Res() response: Response, @Param('id') id: string) {
    try {
      await this.PricelistService.delete(parseInt(id));
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully delete pricelist!',
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
