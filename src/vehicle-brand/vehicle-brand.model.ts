import { Prisma } from '@prisma/client';

export class VehicleBrand implements Prisma.VehicleBrandCreateInput {
  name: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
