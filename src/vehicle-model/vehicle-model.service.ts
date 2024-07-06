import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { VehicleModel } from './vehicle-model.model';

@Injectable()
export class VehicleModelService {
  constructor(private prisma: PrismaService) {}

  async getVehicleModel(
    page: number,
    pageSize: number,
  ): Promise<VehicleModel[]> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    return this.prisma.vehicleModel.findMany({
      skip,
      take,
    });
  }

  async create(body): Promise<VehicleModel> {
    const vehicleType = await this.prisma.vehicleType.findUnique({
      where: {
        id: body.type_id,
      },
    });
    if (!vehicleType) {
      throw new NotFoundException(
        `Vehicle type with ID ${body.type_id} not found.`,
      );
    }

    return await this.prisma.vehicleModel.create({
      data: {
        name: body.name,
        typeId: body.type_id,
      },
    });
  }

  async update(body, id): Promise<VehicleModel> {
    const existingModel = await this.prisma.vehicleModel.findUnique({
      where: { id },
    });

    const existingType = await this.prisma.vehicleType.findUnique({
      where: { id: body.type_id },
    });

    if (!existingModel || !existingType) {
      throw new NotFoundException(
        `${!existingModel ? 'Vehicle model with ID ' + id + ' not found, ' : ''}${!existingType ? 'Vehicle type with ID ' + body.type_id + ' not found.' : ''}`,
      );
    }

    return await this.prisma.vehicleModel.update({
      where: { id },
      data: {
        name: body.name,
        typeId: body.type_id,
      },
    });
  }

  async delete(id): Promise<VehicleModel> {
    const existingModel = await this.prisma.vehicleModel.findUnique({
      where: { id },
    });

    console.log(existingModel);
    if (!existingModel) {
      throw new NotFoundException(`Vehicle Model with ID ${id} not found.`);
    }

    return this.prisma.vehicleModel.delete({
      where: { id },
    });
  }
}
