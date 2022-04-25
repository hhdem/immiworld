import { Module } from '@nestjs/common';
import { UploadFileController } from './upload.file.controller';
import { AuthModule } from '../auth/auth.module';
import { UploadService } from './upload.service';
import { BaseModule } from '../base/base.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoRepository } from './photo.repository';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { ProfileRepository } from '../auth/profile.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PhotoRepository, ProfileRepository]),
    AuthModule,
    BaseModule,
  ],
  providers: [UploadService, PhotoService],
  controllers: [UploadFileController, PhotoController],
  exports: [UploadService],
})
export class FileModule {}
