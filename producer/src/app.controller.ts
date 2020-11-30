import { Controller, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus, UploadedFiles, Inject, Get, Param, ForbiddenException, Res } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { diskStorage } from 'multer';
import { editFileName, fileFilter } from './filters/file.filter';
import * as fs from 'fs';
@Controller()
export class AppController {
  @Inject()
  private readonly appService: AppService;

  @Get('/files')
  async getfiles() {
    return this.appService.getFileNames();
  }

  @Get('/all')
  getAll() {
    return this.appService.getAllDomains();
  }

  @Get('/by-name/:name')
  getByName(@Param('name') name: string) {
    console.log(name);
    return this.appService.getDomainByName(name);
  }

  @Post('/upload')
  @UseInterceptors(
    FilesInterceptor('file', 10, {
      storage: diskStorage({
        destination: `${__dirname}/files`,
        filename: editFileName,
      }),
      fileFilter: fileFilter,
    }),
  )
  upload(@UploadedFiles() file) {
    if(!file || !file.length) {
      throw new ForbiddenException('A File Must be Provided!');
    }
    return this.appService.upload(file)
  }
}

