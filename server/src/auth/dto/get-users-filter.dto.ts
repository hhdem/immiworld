import { IsOptional, IsNotEmpty, IsIn } from 'class-validator';
import { UserStatus } from '../auth.enum';

export class GetUsersFilterDto {
  @IsOptional()
  @IsIn([UserStatus.NORMAL, UserStatus.DELETED, UserStatus.FORBIDDEN])
  status: UserStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  id: number;
}
