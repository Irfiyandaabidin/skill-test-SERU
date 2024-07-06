import { Module } from '@nestjs/common';
import { VehicleBrandService } from './vehicle-brand.service';
import { PrismaService } from 'src/prisma.service';
import { VehicleBrandController } from './vehicle-brand.controller';

@Module({
  providers: [VehicleBrandService, PrismaService],
  controllers: [VehicleBrandController],
})
export class VehicleBrandModule {}
