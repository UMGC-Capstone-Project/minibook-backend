import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UserEntity } from './entities/user.entity';
import { FriendsService } from './services/friend.service';
import { UsersService } from './services/users.service';
import { PublicFileEntity } from '../file/entities/public-file.entity';
import { FileModule } from 'src/file/file.module';
import { BullModule } from '@nestjs/bull';
import { EmailProcessor } from './processors/email.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, PublicFileEntity]),
    BullModule.registerQueue({
      name: 'email',
    }),
    FileModule,
  ],
  providers: [UsersService, FriendsService, EmailProcessor],
  exports: [UsersService, TypeOrmModule],
  controllers: [UsersController],
})
export class UsersModule {}
