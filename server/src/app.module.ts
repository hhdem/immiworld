import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { BaseModule } from './base/base.module';
import {
  I18nModule,
  I18nJsonParser,
  QueryResolver,
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import { FileModule } from './file/file.module';
import { LoggerMiddleware } from './common/logger.middleware';
import { UserRepository } from './auth/user.repository';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { OnlineMiddleware } from './common/online.middleware';
import { UserOnlineService } from './auth/user-online.service';
import { UserOnlineRepository } from './auth/user-online.repository';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 15,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([UserRepository,UserOnlineRepository]),
    AuthModule,
    RoleModule,
    BaseModule,
    FileModule,
    I18nModule.forRootAsync({
      useFactory: () => {
        return {
          fallbackLanguage: 'en',
          parserOptions: {
            path: path.join(__dirname, '/i18n'),
            watch: true,
          },
        };
      },
      parser: I18nJsonParser,
      resolvers: [
        { use: QueryResolver, options: ['lang', 'locale', 'l'] },
        new HeaderResolver(['en', 'zh']),
        AcceptLanguageResolver,
        new CookieResolver(['lang', 'locale', 'l']),
      ],
    }),
  ],
  providers: [{
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },UserOnlineService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(OnlineMiddleware).forRoutes('*');
  }
}
