import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from './controllers/file.controller';
import { PublicFileEntity } from './entities/public-file.entity';
import { FileService } from './services/file.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([PublicFileEntity])],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService, TypeOrmModule],
})
export class FileModule {}
