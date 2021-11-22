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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(
      {
        type: "mysql",
        host: process.env.DATABASE_HOST ,
        port: parseInt(process.env.DATABASE_PORT, 10),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE,
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
