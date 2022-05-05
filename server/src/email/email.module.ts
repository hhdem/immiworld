import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { BaseModule } from 'src/base/base.module';
import { AuthModule } from 'src/auth/auth.module';
import { join } from 'path';
import { UserRepository } from 'src/auth/user.repository';
import { EmailActiveRepository } from './email-active.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';

@Module({
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: config.get('email.host'),
        port: config.get('email.port'),
        ignoreTLS: true,
        secure: true,
        auth: {
          user: config.get('email.auth_user'),
          pass: config.get('email.auth_pass'),
        },
      },
      defaults: {
        from: '"NoReply" ' + config.get('email.auth_user'),
      },
      template: {
        dir: join(__dirname, '/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    AuthModule,
    BaseModule,
    TypeOrmModule.forFeature([EmailActiveRepository, UserRepository]),
  ]
})
export class EmailModule {}
