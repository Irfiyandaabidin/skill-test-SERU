import { Module } from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';
import { PrismaService } from 'src/prisma.service';
import { VehicleTypeController } from './vehicle-type.controller';

@Module({
  providers: [VehicleTypeService, PrismaService],
  controllers: [VehicleTypeController],
})
export class VehicleTypeModule {}
