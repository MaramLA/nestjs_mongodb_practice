import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dtos/createUser.dto';
import { User } from '../schemas/user.schema';
import { UpdateUserDto } from '../dtos/updateUser.dto';
import { UserSettings } from '../schemas/userSettings.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
  ) {}
  async createUser({ settings, ...createUserDto }: CreateUserDto) {
    if (settings) {
      const newUserSettings = new this.userSettingsModel(settings);

      const savedSettings = await newUserSettings.save();

      const newUser = new this.userModel({
        ...createUserDto,
        settings: savedSettings._id,
      });

      return newUser.save();
    }
    const newUser = new this.userModel({
      ...createUserDto,
    });
    return newUser.save();
  }

  public getUsers() {
    return this.userModel.find();
  }

  public async getUserById(id: string) {
    return this.userModel.findById(id).populate('settings');
  }

  public async updateUserById(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  public async deleteUserById(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
