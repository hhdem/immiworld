import { IsNumber, IsOptional } from 'class-validator';

export class BaseFilterDto {
  @IsOptional()
  search: string;

  @IsOptional()
  page: number;

  @IsOptional()
  pageSize: number = 20;
}
