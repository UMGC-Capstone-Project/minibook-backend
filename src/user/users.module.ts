import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UserEntity } from './entities/user.entity';
import { FriendsService } from './services/friend.service';
import { UsersService } from './services/users.service';
import { FileService } from '../file/services/file.service';
import { PublicFileEntity } from '../file/entities/public-file.entity';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, PublicFileEntity]),
    FileModule,
  ],
  providers: [UsersService, FriendsService],
  exports: [UsersService, TypeOrmModule],
  controllers: [UsersController],
})
export class UsersModule {}
