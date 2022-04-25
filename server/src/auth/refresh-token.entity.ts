import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class RefreshToken extends BaseEntity {
    @Index()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number
  
    @Column()
    is_revoked: boolean
  
    @Column()
    expires: Date
  }
  