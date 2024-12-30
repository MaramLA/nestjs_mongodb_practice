import { CreatePostDto } from './dtos/createPost.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/user/schemas/post.schema';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModule: Model<Post>,
    @InjectModel(User.name) private userModule: Model<User>,
  ) {}

  async createPost({ userId, ...createPostDto }: CreatePostDto) {
    const foundUser = await this.userModule.findById(userId);
    if (!foundUser) {
      throw new HttpException('User not found', 404);
    }
    const newPost = new this.postModule(createPostDto);
    const savedPost = await newPost.save();
    const updatedUser = await foundUser.updateOne({
      $push: { posts: savedPost._id },
    });
    return savedPost;
  }
  findPostById() {}
}
