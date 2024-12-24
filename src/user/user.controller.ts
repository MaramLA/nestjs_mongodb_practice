import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { UserService } from './providers/user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  //   @UsePipes(new ValidationPipe()) // to enable dto validation locally
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto: ', createUserDto);
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid id', 400);
    }
    const foundUser = await this.userService.getUserById(id);
    if (!foundUser) throw new HttpException('User not found', 404);
    return foundUser;
  }
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid id', 400);
    }
    const updatedUser = await this.userService.updateUserById(
      id,
      updateUserDto,
    );
    if (!updatedUser) {
      throw new HttpException('User not found', 404);
    }
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid id', 400);
    }
    const deletedUser = await this.userService.deleteUserById(id);
    if (!deletedUser) {
      throw new HttpException('User not found', 404);
    }
    return 'user deleted successfully';
  }
}
