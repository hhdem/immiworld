import { Module } from '@nestjs/common';
import { GoogleOauthController } from './auth-google.controller';
import { GoogleOauthStrategy } from './auth-google.strategy';

@Module({
  imports: [],
  controllers: [GoogleOauthController],
  providers: [GoogleOauthStrategy],
})
export class GoogleOauthModule {}