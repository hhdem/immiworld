import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { EmailActive } from './email-active.entity';

@EntityRepository(EmailActive)
export class EmailActiveRepository extends Repository<EmailActive> {

  async getOneByEmail(email: string): Promise<EmailActive>{
    const query = this.createQueryBuilder('emailActive');
    if (email) {
      query.andWhere('emailActive.email = :email', { email });
      const emailActive = await query.getOne();
      return emailActive;
    } else {
      return null;
    }
  }

  async getOneByConfirmcode(confirmcode: string): Promise<EmailActive>{
    const query = this.createQueryBuilder('emailActive');
    if (confirmcode) {
      query.andWhere('emailActive.confirmcode = :confirmcode', { confirmcode });
      const emailActive = await query.getOne();
      return emailActive;
    } else {
      return null;
    }
  }
}
