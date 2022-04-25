import { Column, BaseEntity, Unique, Index } from 'typeorm';
import { AuthInterface } from '../auth/auth.interface';
import * as bcrypt from 'bcryptjs';

@Unique(['username'])
export class UserBase extends BaseEntity implements AuthInterface {
  @Index()
  @Column()
  showname: string;

  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  salt: string;
  @Column()
  createDate: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
