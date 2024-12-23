import {
  Body,
  Controller,
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
  @Patch(":id")
  updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto){}
}
