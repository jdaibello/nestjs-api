import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDto } from './dto/update.put.user.dto';
import { UpdatePatchUserDto } from './dto/update.patch.user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    try {
      data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());

      return await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          birthDate: data.birthDate ? new Date(data.birthDate) : null,
        },
      });
    } catch (e) {
      throw new BadRequestException(
        'An user with this e-mail is already registered',
      );
    }
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    { name, email, password, birthDate, role }: UpdatePutUserDto,
  ) {
    await this.notExists(id);

    password = await bcrypt.hash(password, await bcrypt.genSalt());

    return this.prisma.user.update({
      data: {
        name,
        email,
        password,
        birthDate: birthDate ? new Date(birthDate) : null,
        role,
      },
      where: { id },
    });
  }

  async updatePartial(
    id: number,
    { name, email, password, birthDate, role }: UpdatePatchUserDto,
  ) {
    await this.notExists(id);

    const data: any = {};

    if (name) {
      data.name = name;
    }

    if (email) {
      data.email = email;
    }

    if (password) {
      data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    }

    if (birthDate) {
      data.birthDate = new Date(birthDate);
    }

    if (role) {
      data.role = role;
    }

    return this.prisma.user.update({
      data,
      where: { id },
    });
  }

  async delete(id: number) {
    await this.notExists(id);

    return this.prisma.user.delete({ where: { id } });
  }

  async notExists(id: number) {
    if (!(await this.findOne(id))) {
      throw new NotFoundException(`The user with id ${id} doesn't exist`);
    }
  }
}
