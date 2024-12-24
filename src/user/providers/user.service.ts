import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dtos/createUser.dto';
import { User } from '../schemas/user.schema';
import { UpdateUserDto } from '../dtos/updateUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  public createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  public getUsers() {
    return this.userModel.find();
  }

  public async getUserById(id: string) {
    return this.userModel.findById(id);
  }


  public async updateUserById(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }
}
