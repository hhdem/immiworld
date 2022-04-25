import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  Index,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserStatus, UserRole } from './auth.enum';
import { UserBase } from '../base/user.base.entity';
import { Photo } from '../file/photo.entity';
import { Profile } from './profile.entity';
import { UserStatistic } from './user-statistic.entity';

@Entity()
export class User extends UserBase {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: UserStatus;

  @OneToMany(
    () => Photo,
    photo => photo.user,
    { eager: false },
  )
  photos: Photo[];

  @Column()
  role: UserRole; // 角色

  @Column({ nullable: true })
  ip: string;

  @OneToOne(() => Profile, { eager: true })
  @JoinColumn()
  profile: Profile;

  @OneToOne(() => UserStatistic, statistic => statistic.user, { eager: true, cascade: true })
  @JoinColumn()
  statistic: UserStatistic;

}
