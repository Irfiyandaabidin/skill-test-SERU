import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Users } from './users.model';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }

  async createUser(data: Users): Promise<Users> {
    const existing = await this.prisma.users.findFirst({
      where: {
        name: data.name,
      },
    });

    if (existing) {
      throw new ConflictException('name already exist');
    }

    return this.prisma.users.create({
      data,
    });
  }
}
