import { Photo } from './photo.entity';
import { EntityRepository, Repository } from 'typeorm';
import { PhotoType, PhotoStatus, PhotoFunctionType } from './photo.enum';
import { InternalServerErrorException } from '@nestjs/common';
import { User } from '../auth/user.entity';
import { GetPhotoFilterDto } from './dto/get-photo-filter.dto';

@EntityRepository(Photo)
export class PhotoRepository extends Repository<Photo> {
  async getPhotos(filterDto: GetPhotoFilterDto, user: User): Promise<Photo[]> {
    // return this.query('select id, count(id) from task group by id;');
    // console.log(all);
    const { newsId, ccpId } = filterDto;
    const query = this.createQueryBuilder('photo');
    console.info('getPhotos was called....');
    console.info(user);
    if (user) {
      query.where('photo.user.id = :userId', { userId: user.id });
    }
    if (newsId) {
      query.andWhere('news.id = :newsId', { newsId });
    }

    query.orderBy('photo.createDate', 'DESC');
    const photos = await query.getMany();
    return photos;
  }

  async savePhotoToProfile(filepath: string, user: User): Promise<Photo> {
    const photo = this.create();
    photo.functionType = PhotoFunctionType.AVATOR_USER;
    photo.path = filepath;
    photo.user = user;
    photo.createDate = new Date();
    photo.folder = 'upload';
    photo.type = PhotoType.LOCAL;
    photo.status = PhotoStatus.NORMAL;
    
    try {
      return await photo.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}
