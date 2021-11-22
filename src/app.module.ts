import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NewsboardEntity } from './entity/newsboard.entity';
import { PostEntity } from './entity/post.entity';
import { UserEntity } from './entity/user.entity';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

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
          NewsboardEntity,
          PostEntity
        ]
      }
    ),
    AuthModule,
    UsersModule,
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
