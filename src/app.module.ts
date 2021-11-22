import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NewsPostEntity } from './feed/entities/news-post.entity';
import { UsersModule } from './user/users.module';
import { FeedModule } from './feed/feed.module';
import { PostEntity } from './feed/entities/post.entity';
import { UserEntity } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: "mysql",
        host: "db",
        port: 3306,
        username: "root",
        password: "db-q5n2g",
        database: "minibook_development",
        synchronize: true,
        entities: [
          UserEntity,
          NewsPostEntity,
          PostEntity
        ]
      }
    ),
    AuthModule,
    UsersModule,
    FeedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
