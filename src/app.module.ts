import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Comment, Friend, Location, Newsboard, Notification, Photo, Post, Profile, Tag, User } from './entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(
    {
      entities: [
        Comment,
        Friend,
        Location,
        Newsboard,
        Notification,
        Photo,
        Post,
        Profile,
        Tag,
        User
      ]
    }
  ), AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
