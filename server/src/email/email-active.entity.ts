import { EmailStatus } from 'src/auth/auth.enum';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Index,
    BaseEntity,
  } from 'typeorm';
  
  @Entity()
  export class EmailActive extends BaseEntity {
      
    @Index()
    @PrimaryGeneratedColumn()
    email: string;
  
    @Column()
    confirmcode: string;
  
    @Column({default: EmailStatus.INACTIVE})
    emailStatus: EmailStatus;
  
  }
  