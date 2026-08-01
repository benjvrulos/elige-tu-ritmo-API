import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiHeaders, ApiOperation } from '@nestjs/swagger';
import { type Express } from 'express';
import { UploadsService } from './providers/uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(
    /**
    Inject the UploadService
    */
    private readonly uploadsService: UploadsService,
  ) {}

  @ApiHeaders([
    { name: 'Content-type', description: 'multipart/form-data' },
    { name: 'Authorization', description: 'Bearer token' },
  ])
  @ApiOperation({ summary: 'Upload a new image to the server' })
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  public uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required!');
    }
    return this.uploadsService.uploadFile(file);
  }
}
