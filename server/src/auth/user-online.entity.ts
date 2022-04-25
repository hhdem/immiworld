import { Entity, BaseEntity, Index, PrimaryGeneratedColumn, OneToOne, Column } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserOnline extends BaseEntity {
    @Index()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    showname: string;

    @Column()
    userId: number;

    @Column()
    onlineDate: Date;

    @Column()
    todayRequestNumber: number = 0;
}