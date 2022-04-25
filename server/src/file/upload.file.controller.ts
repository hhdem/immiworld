import {
  FileInterceptor,
  FilesInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import {
  Controller,
  UseGuards,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  UploadedFiles,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { createWriteStream } from 'fs';
import { join } from 'path';
import * as _ from 'lodash';
import { UploadService } from './upload.service';
import { CommonService } from '../base/common.service';

@Controller('up')
@UseGuards(AuthGuard())
export class UploadFileController {
  constructor(
    private uploadService: UploadService,
    private commonService: CommonService,
  ) {}
  /**
   * 上传单文件
   * @param file
   * @param body
   */
  @Post('/file')
  @UseInterceptors(FileInterceptor('file')) // file对应HTML表单的name属性
  uploadedFile(
    @UploadedFile() file,
    // @I18n() i18n: I18nContext,
  ): string {
    return this.uploadService.saveFile(file);
  }

  /**
   * 上传多文件
   * @param file
   * @param body
   */
  @Post('/files')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadedFiles(@UploadedFiles() files, @Body() body) {
    if (!body.name || files.length === 0) {
      throw new HttpException(
        await this.commonService.getI18NText('upload.WRONG_PARAMS'),
        HttpStatus.FORBIDDEN,
      );
    }
    for (const file of files) {
      const writeFile = createWriteStream(
        join(
          __dirname,
          '..',
          'upload',
          `${body.name}-${Date.now()}-${file.originalname}`,
        ),
      );
      writeFile.write(file.buffer);
    }
  }

  /**
   * 上传多字段多文件
   * @param file
   * @param body
   */
  @Post('/cover')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'front',
        maxCount: 1,
      },
      {
        name: 'back',
        maxCount: 1,
      },
    ]),
  )
  async uploadedMutiPropertiesFiles(@UploadedFiles() files, @Body() body) {
    if (!body.name || _.isEmpty(files)) {
      throw new HttpException(
        await this.commonService.getI18NText('upload.WRONG_PARAMS'),
        HttpStatus.FORBIDDEN,
      );
    }
    _.each(files, (v: any[], k: string) => {
      for (const file of v) {
        const writeFile = createWriteStream(
          join(
            __dirname,
            '..',
            'upload',
            `${body.name}-${k}-${Date.now()}-${file.originalname}`,
          ),
        );
        writeFile.write(file.buffer);
      }
    });
  }
}
