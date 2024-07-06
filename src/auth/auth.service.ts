import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { Users } from 'src/users/users.model';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(registerDto: RegisterUserDto): Promise<any> {
    const createUser = new Users();
    createUser.name = registerDto.name;
    createUser.isAdmin = registerDto.isAdmin;
    createUser.password = await bcrypt.hash(registerDto.password, 10);

    const user = await this.usersService.createUser(createUser);

    return {
      token: this.jwtService.sign({ name: user.name }),
    };
  }

  async login(loginDto: LoginUserDto): Promise<any> {
    const { name, password } = loginDto;
    const user = await this.prismaService.users.findFirst({
      where: {
        name,
      },
    });

    if (!user) {
      throw new NotFoundException('name not found!');
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      throw new NotFoundException('Invalid Password');
    }

    return {
      token: this.jwtService.sign({
        name,
        isAdmin: user.isAdmin,
      }),
    };
  }
}
