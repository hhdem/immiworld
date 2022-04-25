import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserBase } from '../base/user.base.entity';
import { AdminStatus } from '../auth/auth.enum';

@Entity()
export class Admin extends UserBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: AdminStatus;
}
