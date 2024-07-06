import { Prisma } from '@prisma/client';

export class Users implements Prisma.UsersCreateInput {
  name: string;
  isAdmin?: boolean;
  password: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
