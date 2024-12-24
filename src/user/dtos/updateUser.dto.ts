import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  //   @IsString()
  //   @IsOptional()
  //   username: string;
  
  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;
  
  @IsString()
  @IsOptional()
  avatarUrl: string;
}
