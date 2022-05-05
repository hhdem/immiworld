import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  HttpStatus,
  Ip,
} from '@nestjs/common';
import { AuthCredentialsDto, RefreshToken } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { HttpProcessor } from '../base/decorator/http.decorator';
import { TokensService } from './token.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

export interface AuthenticationPayload {
  user: { username: string; role: string; id: number}
  payload: {
    type: string
    token: string
    refresh_token?: string
  }
}

@ApiTags('用户')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private tokenService: TokensService) {}

  @ApiOperation({ summary: '用户注册' })
  @Post('/signup')
  @HttpProcessor.success('注册成功', 200)
  @HttpProcessor.handle({ message: '注册', error: HttpStatus.BAD_REQUEST })
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    @Ip() ip: string,
  ) {
    authCredentialsDto.ip = ip;
    return this.authService.signUp(authCredentialsDto);
  }

  @ApiOperation({ summary: '用户登录' })
  @Post('/signin')
  @HttpProcessor.success('登录成功', 200)
  @HttpProcessor.handle({ message: '登陆', error: HttpStatus.BAD_REQUEST })
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ) {
    return this.authService.signIn(authCredentialsDto);
  }


  @ApiOperation({ summary: 'checkToken' })
  @Post('/checkToken')
  @UseGuards(AuthGuard())
  async checkToken() {
    return true;
  }

  
  @ApiOperation({ summary: '刷新Token' })
  @Post('/refresh')
  async refresh(@Body() body: RefreshToken): Promise<any> {
    const { user, token , refreshToken} = await this.tokenService.createAccessTokenFromRefreshToken(body.refresh_token);
    console.info('refresh == token');
    // const payload = this.authService.buildResponsePayload(user, token);

    return { user, accessToken: token , refreshToken}
  }

}
