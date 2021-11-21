import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Comment, Friend, Location, Newsboard, Notification, Photo, Post, Profile, Tag, User } from './entity';

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
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
