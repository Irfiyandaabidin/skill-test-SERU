import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { VehicleBrand } from './vehicle-brand.model';

@Injectable()
export class VehicleBrandService {
  constructor(private prisma: PrismaService) {}

  async getVehicleBrand(
    page: number,
    pageSize: number,
  ): Promise<VehicleBrand[]> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    return this.prisma.vehicleBrand.findMany({
      skip,
      take,
    });
  }

  async get(id): Promise<VehicleBrand> {
    const existingBrand = await this.prisma.vehicleBrand.findUnique({
      where: { id },
    });

    if (!existingBrand) {
      throw new NotFoundException(`Vehicle brand with ID ${id} not found.`);
    }

    return existingBrand;
  }

  async create(body): Promise<VehicleBrand> {
    return this.prisma.vehicleBrand.create({
      data: {
        name: body.name,
      },
    });
  }

  async update(body, id): Promise<VehicleBrand> {
    const existingBrand = await this.prisma.vehicleBrand.findUnique({
      where: { id },
    });

    if (!existingBrand) {
      throw new NotFoundException(`Vehicle brand with ID ${id} not found.`);
    }

    return await this.prisma.vehicleBrand.update({
      where: { id },
      data: {
        name: body.name,
      },
    });
  }

  async delete(id): Promise<VehicleBrand> {
    const existingBrand = await this.prisma.vehicleBrand.findUnique({
      where: { id },
    });

    if (!existingBrand) {
      throw new NotFoundException(`Vehicle brand with ID ${id} not found.`);
    }

    return await this.prisma.vehicleBrand.delete({
      where: { id },
    });
  }
}
