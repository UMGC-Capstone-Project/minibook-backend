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
import { ChatModule } from './chat/chat.module';
import configuration from './config/configuration';
import { MailerModule } from '@nestjs-modules/mailer';
import { FileModule } from './file/file.module';
import { PublicFileEntity } from './file/entities/public-file.entity';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { BullModule } from '@nestjs/bull';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('queue.host'),
          port: +configService.get<string>('queue.port'),
          username: configService.get<string>('queue.username'),
          password: configService.get<string>('queue.password')
        },
      }),
      inject: [ConfigService],
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
        entities: [UserEntity, NewsPostEntity, PostEntity, PublicFileEntity],
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: configService.get<string>('smtp.transport'),
        defaults: {
          from: '"minibook" <no-reply@minibook.io>',
        },
        template: {
          dir: process.cwd() + '/template/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    FeedModule,
    HealthModule,
    ChatModule,
    FileModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

