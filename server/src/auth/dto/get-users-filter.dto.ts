import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsIn } from 'class-validator';
import { UserStatus } from '../auth.enum';

export class GetUsersFilterDto {
  
  @ApiProperty()
  @ApiPropertyOptional()
  @IsOptional()
  @IsIn([UserStatus.NORMAL, UserStatus.DELETED, UserStatus.FORBIDDEN])
  status: UserStatus;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsOptional()
  id: number;
}
