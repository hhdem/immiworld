import { IsOptional } from 'class-validator';

export class GetPhotoFilterDto {
  @IsOptional()
  newsId: number;

  @IsOptional()
  ccpId: number;
}
