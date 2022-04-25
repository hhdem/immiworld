import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { GetPhotoFilterDto } from './dto/get-photo-filter.dto';
import { Photo } from './photo.entity';
import { PhotoRepository } from './photo.repository';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(PhotoRepository)
    private photoRepository: PhotoRepository,
  ) {}

  async getPhotos(filterDto: GetPhotoFilterDto, user: User): Promise<Photo[]> {
    return this.photoRepository.getPhotos(filterDto, user);
  }
}
