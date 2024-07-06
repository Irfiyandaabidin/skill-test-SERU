import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { VehicleType } from './vehicle-type.model';

@Injectable()
export class VehicleTypeService {
  constructor(private prisma: PrismaService) {}

  async getVehicleType(page: number, pageSize: number): Promise<VehicleType[]> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    return this.prisma.vehicleType.findMany({
      skip,
      take,
    });
  }

  async get(id): Promise<VehicleType> {
    const existingType = await this.prisma.vehicleType.findUnique({
      where: { id },
    });

    if (!existingType) {
      throw new NotFoundException(`Vehicle Type with ID ${id} not found.`);
    }

    return existingType;
  }

  async create(body): Promise<VehicleType> {
    const vehicleBrand = await this.prisma.vehicleBrand.findUnique({
      where: {
        id: body.brandId,
      },
    });
    if (!vehicleBrand) {
      throw new NotFoundException(
        `Vehicle Brand with ID ${body.brandId} not found.`,
      );
    }

    return await this.prisma.vehicleType.create({
      data: {
        name: body.name,
        brandId: body.brandId,
      },
    });
  }

  async update(body, id): Promise<VehicleType> {
    const existingType = await this.prisma.vehicleType.findUnique({
      where: { id },
    });

    const existingBrand = await this.prisma.vehicleBrand.findUnique({
      where: { id: body.brandId },
    });

    if (!existingType || !existingBrand) {
      throw new NotFoundException(
        `${!existingBrand ? 'Vehicle brand with ID ' + body.brandId + ' not found, ' : ''}${!existingType ? 'Vehicle type with ID ' + id + ' not found.' : ''}`,
      );
    }

    return await this.prisma.vehicleType.update({
      where: { id },
      data: {
        name: body.name,
        brandId: body.brandId,
      },
    });
  }

  async delete(id): Promise<VehicleType> {
    const existingType = await this.prisma.vehicleType.findUnique({
      where: { id },
    });

    if (!existingType) {
      throw new NotFoundException(`Vehicle Type with ID ${id} not found.`);
    }

    return await this.prisma.vehicleType.delete({
      where: { id },
    });
  }
}
