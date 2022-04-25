import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';
import { PhotoFunctionType, PhotoStatus, PhotoType } from './photo.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createDate: Date;

  @Column()
  folder: string;

  @Column()
  path: string;

  @Column({ default: PhotoType.LOCAL })
  type: PhotoType;

  @Column({ default: PhotoStatus.NORMAL })
  status: PhotoStatus;

  @Column({ default: PhotoFunctionType.NORMAL })
  functionType: PhotoFunctionType;

  @ManyToOne(
    () => User,
    user => user.photos,
  )
  user: User;
}
