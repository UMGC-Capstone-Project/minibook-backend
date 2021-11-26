import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendsController } from './controllers/friend.controller';
import { UsersController } from './controllers/users.controller';
import { PublicFileEntity } from './entities/public-file.entity';
import { UserEntity } from './entities/user.entity';
import { FileService } from './services/fileupload.service';
import { FriendsService } from './services/friend.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PublicFileEntity])],
  providers: [UsersService, FriendsService, FileService],
  exports: [UsersService, TypeOrmModule],
  controllers: [UsersController, FriendsController],
})
export class UsersModule {}
