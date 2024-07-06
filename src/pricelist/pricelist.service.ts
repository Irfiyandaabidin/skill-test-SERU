import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Pricelist } from '@prisma/client';

@Injectable()
export class PricelistService {
  constructor(private prisma: PrismaService) {}

  async getPricelist(page: number, pageSize: number): Promise<Pricelist[]> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    return this.prisma.pricelist.findMany({
      skip,
      take,
    });
  }

  async create(body): Promise<Pricelist> {
    const model = await this.prisma.vehicleModel.findUnique({
      where: {
        id: body.model_id,
      },
    });
    const year = await this.prisma.vehicleYear.findUnique({
      where: {
        id: body.year_id,
      },
    });
    if (!year || !model) {
      throw new NotFoundException(`vehicle year or vehicle model not found.`);
    }

    return await this.prisma.pricelist.create({
      data: {
        code: body.code,
        price: body.price,
        yearId: body.year_id,
        modelId: body.model_id,
      },
    });
  }

  async update(body, id): Promise<Pricelist> {
    const existingModel = await this.prisma.vehicleModel.findUnique({
      where: { id },
    });

    const existingYear = await this.prisma.vehicleYear.findUnique({
      where: { id: body.year_id },
    });

    if (!existingYear || !existingModel) {
      throw new NotFoundException(`vehicle year or vehicle model not found.`);
    }

    return await this.prisma.pricelist.update({
      where: { id },
      data: {
        code: body.code,
        price: body.price,
        yearId: body.year_id,
        modelId: body.model_id,
      },
    });
  }

  async delete(id): Promise<Pricelist> {
    const existingModel = await this.prisma.pricelist.findUnique({
      where: { id },
    });

    if (!existingModel) {
      throw new NotFoundException(`Pricelist with ID ${id} not found.`);
    }

    return this.prisma.pricelist.delete({
      where: { id },
    });
  }
}
