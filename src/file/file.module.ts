import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { UsersModule } from 'src/user/users.module';
import { FileController } from './controllers/file.controller';
import { PublicFileEntity } from './entities/public-file.entity';
import { FileService } from './services/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([PublicFileEntity])],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService, TypeOrmModule]
})
export class FileModule {}
