import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommentEntity } from './entity/comment.entity';
import { FriendEntity } from './entity/friend.entity';
import { LocationEntity } from './entity/location.entity';
import { NewsboardEntity } from './entity/newsboard.entity';
import { NotificationEntity } from './entity/notification.entity';
import { PhotoEntity } from './entity/photo.entity';
import { PostEntity } from './entity/post.entity';
import { ProfileEntity } from './entity/profile.entity';
import { TagEntity } from './entity/tag.entity';
import { UserEntity } from './entity/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        entities: [
          CommentEntity,
          FriendEntity,
          LocationEntity,
          NewsboardEntity,
          NotificationEntity,
          PhotoEntity,
          PostEntity,
          ProfileEntity,
          TagEntity,
          UserEntity
        ]
      }
    ),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
