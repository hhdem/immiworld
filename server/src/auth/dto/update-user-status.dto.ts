import { IsInt, IsEnum } from 'class-validator';
import { UserStatus } from '../auth.enum';

export class UpdateUserStatusDto {
  @IsInt()
  readonly userid: number;

  @IsEnum(UserStatus, {
    message: '无效的用户状态',
  })
  readonly status: UserStatus;
}
