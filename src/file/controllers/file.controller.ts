import {
  Controller,
  Injectable,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserRequest } from 'src/common/decorator';
import { FileService } from '../services/file.service';

@Controller({
  path: 'file',
  version: '1',
})
@ApiTags('files')
@ApiBearerAuth()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async uploadFile(
    @UserRequest() user,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.fileService.uploadPublic(user.id, file);
  }

  @Post('uploads')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  async uploadFiles(
    @UserRequest() user,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return await this.fileService.uploadMultiPublic(user.id, files);
  }
}
