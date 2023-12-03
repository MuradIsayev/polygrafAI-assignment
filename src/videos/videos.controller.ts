import {
  Controller,
  Post,
  HttpStatus,
  ParseFilePipeBuilder,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { multerOptions } from './multer.options';

const VALID_UPLOADS_MIME_TYPE = 'video/mp4';
const maxFileSize = 1024 * 1024 * 10; // 20MB

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  public async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return file;
  }
}
