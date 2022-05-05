import { Injectable } from '@nestjs/common';
import {MailerService } from '@nestjs-modules/mailer';
import { EmailActiveRepository } from './email-active.repository';
import { EmailActive } from './email-active.entity';
import { EmailStatus } from 'src/auth/auth.enum';
import { UserRepository } from 'src/auth/user.repository';
import {Md5} from 'ts-md5/dist/md5';
import * as config from 'config';
const jwtConfig = config.get('jwt');

@Injectable()
export class EmailService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly mailerService: MailerService,
        private readonly emailActiveRepository: EmailActiveRepository
    ) {}

    async sendActiveEmail(email, user){
        const emailActive = await this.emailActiveRepository.getOneByEmail(email);
        const url = Md5.hashStr(jwtConfig.secret + email);
        return await this.mailerService
          .sendMail({
            to: email, // list of receivers
            subject: ' ✔ Welcome to ImmiWorld! Confirm your Email', // Subject line
            template: 'confirmation',
            context: { name: user.showname, url: url }
          })
          .then((e) => {
            console.log('send mail success:');
            // 创建 EmailActive 数据
            if (emailActive) {
                if (emailActive.emailStatus !== EmailStatus.SENTCODE) {
                    emailActive.emailStatus = EmailStatus.SENTCODE;
                    emailActive.save();
                }
            } else {
                const emailActiveNew = new EmailActive();
                emailActiveNew.emailStatus = EmailStatus.SENTCODE;
                emailActiveNew.email = email;
                emailActiveNew.confirmcode = url;
                emailActiveNew.save();
            }
            return true;
          })
          .catch((e) => {
            console.log('send mail failure:');
            console.log(e);
            return false;
          });
      }
    
   async activeStatusByConfirmcode(confirmcode: string) {
        const emailActive = await this.emailActiveRepository.getOneByConfirmcode(confirmcode);
        emailActive.emailStatus = EmailStatus.ACTIVED;
        emailActive.save();

        const user = await this.userRepository.getOneByEmail(emailActive.email);
        user.emailStatus = EmailStatus.ACTIVED;
        user.save();
   }
}
