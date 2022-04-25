import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional
} from 'class-validator';
import { Match } from '../../base/decorator/match.decorator';

export class AuthCredentialsDto {
  @ApiProperty()
  @IsString()
  @MinLength(4, { message: '用户名4-30位之间' })
  @MaxLength(30, { message: '用户名4-30位之间' })
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(6, { message: '密码6-20位之间' })
  @MaxLength(20, { message: '密码6-20位之间' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message:'密码格式不对'})
  password: string;

  @ApiProperty()
  @IsOptional()
  @Match('password', {message: '密码不匹配'})
  repassword: string;

  @ApiProperty()
  @IsOptional()
  ip: string;
}

export class RefreshToken {
  @IsString()
  refresh_token: string;
}
