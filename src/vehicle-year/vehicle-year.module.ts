import { Module } from '@nestjs/common';
import { VehicleYearService } from './vehicle-year.service';
import { PrismaService } from 'src/prisma.service';
import { VehicleYearController } from './vehicle-year.controller';

@Module({
  providers: [VehicleYearService, PrismaService],
  controllers: [VehicleYearController],
})
export class VehicleYearModule {}
