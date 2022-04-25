import { join } from 'path';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoRepository } from './photo.repository';
import { ProfileRepository } from '../auth/profile.repository';
import { User } from '../auth/user.entity';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(PhotoRepository)
    private photoRepository: PhotoRepository,
    private profileRepository: ProfileRepository,
  ) {}

  saveFile(file): string {
    const path = join(__dirname, '..', 'upload', `${file.originalname}`);
    try {
      const writeFile = createWriteStream(path);
      writeFile.write(file.buffer);
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return path;
  }

  saveFileWithName(file, fileName: string): string {
    const syspath = join(__dirname, '..', 'upload', `${fileName}`);
    const path = `/upload/${fileName}`;
    try {
      const writeFile = createWriteStream(syspath);
      writeFile.write(file.buffer);
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return path;
  }

  async savePhotoToProfile(file, user: User) {
    const profile = user.profile;
    const prefix = '.jpg';
    const filename = `profile-${profile.id}-${Date.now()}${prefix}`;
    const path = this.saveFileWithName(file, filename);
    const photo = await this.photoRepository.savePhotoToProfile(path, user);
    profile.avatar = photo;
    this.profileRepository.save(profile);
  }

}
