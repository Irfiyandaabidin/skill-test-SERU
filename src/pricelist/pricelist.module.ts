import { Module } from '@nestjs/common';
import { PricelistService } from './pricelist.service';
import { PricelistController } from './pricelist.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PricelistService, PrismaService],
  controllers: [PricelistController],
})
export class PricelistModule {}
