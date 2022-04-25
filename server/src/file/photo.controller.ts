import {
  Controller,
  Get,
  Logger,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../auth/user.entity';
import { GetPhotoFilterDto } from './dto/get-photo-filter.dto';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
  private logger = new Logger('PhotoController');

  constructor(private photoService: PhotoService) {}

  @Get()
  @UseGuards(AuthGuard())
  getPhotos(
    @Query(ValidationPipe) filterDto: GetPhotoFilterDto,
    @GetUser() user: User,
  ): Promise<Photo[]> {
    return this.photoService.getPhotos(filterDto, user);
  }
}
