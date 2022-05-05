import {
  Controller,
  Get,
  Logger,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../auth/user.entity';
import { GetPhotoFilterDto } from './dto/get-photo-filter.dto';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';

@ApiTags('图片')
@Controller('photo')
export class PhotoController {
  private logger = new Logger('PhotoController');

  constructor(private photoService: PhotoService) {}

  @ApiOperation({ summary: '獲取登录用户图片列表' })
  @ApiBearerAuth('authorization')
  @Get()
  @UseGuards(AuthGuard())
  getPhotos(
    @Query(ValidationPipe) filterDto: GetPhotoFilterDto,
    @GetUser() user: User,
  ): Promise<Photo[]> {
    return this.photoService.getPhotos(filterDto, user);
  }
}
