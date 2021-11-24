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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { FriendsModule } from './friends/friends.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        database: configService.get<string>('database.name'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        synchronize: configService.get<boolean>('database.synchronize'),
        keepConnectionAlive: true,
        ssl: {
          ca: configService.get<string>('database.certificateAuthority'),
          rejectUnauthorized: false,
        },
        entities: [UserEntity, NewsPostEntity, PostEntity],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    FeedModule,
    HealthModule,
    FriendsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
