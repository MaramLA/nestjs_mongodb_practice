import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, MongooseModule.forRoot("mongodb://0.0.0.0:27017/tester")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
