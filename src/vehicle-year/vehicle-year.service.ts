import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { VehicleYear } from './vehicle-year.model';

@Injectable()
export class VehicleYearService {
  constructor(private prisma: PrismaService) {}

  async getVehicleYear(page: number, pageSize: number): Promise<VehicleYear[]> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    return this.prisma.vehicleYear.findMany({
      skip,
      take,
    });
  }

  async get(id): Promise<VehicleYear> {
    const existingYear = await this.prisma.vehicleYear.findUnique({
      where: { id },
    });

    if (!existingYear) {
      throw new NotFoundException(`Vehicle Year with ID ${id} not found.`);
    }

    return existingYear;
  }

  async create(body): Promise<VehicleYear> {
    return this.prisma.vehicleYear.create({
      data: {
        year: body.year,
      },
    });
  }

  async update(body, id): Promise<VehicleYear> {
    const existingYear = await this.prisma.vehicleYear.findUnique({
      where: { id },
    });

    if (!existingYear) {
      throw new NotFoundException(`Vehicle Year with ID ${id} not found.`);
    }

    return await this.prisma.vehicleYear.update({
      where: { id },
      data: {
        year: body.year,
      },
    });
  }

  async delete(id): Promise<VehicleYear> {
    const existingYear = await this.prisma.vehicleYear.findUnique({
      where: { id },
    });

    if (!existingYear) {
      throw new NotFoundException(`Vehicle Year with ID ${id} not found.`);
    }

    return await this.prisma.vehicleYear.delete({
      where: { id },
    });
  }
}
