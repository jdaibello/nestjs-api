import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdatePutUserDto } from './dto/update.put.user.dto';
import { UpdatePatchUserDto } from './dto/update.patch.user.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() { name, email, password }: CreateUserDto) {
    return { name, email, password };
  }

  @Get()
  async findAll() {
    return { users: [] };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return { user: {}, id };
  }

  @Put(':id')
  async update(
    @Body() { name, email, password }: UpdatePutUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return {
      method: 'PUT',
      name,
      email,
      password,
      id,
    };
  }

  @Patch(':id')
  async updatePartial(
    @Body() body: UpdatePatchUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return {
      method: 'PATCH',
      body,
      id,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
}
