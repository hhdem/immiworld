import { Entity, BaseEntity, Index, PrimaryGeneratedColumn, OneToOne, Column } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserStatistic extends BaseEntity {
    @Index()
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User, user=>user.statistic)
    user: User;

    @Column()
    createdNews: number = 0;

    @Column()
    likedNews: number = 0;

    @Column()
    advancedNews: number = 0;

    @Column()
    createdCcp: number = 0;

    @Column()
    joinedTeam: number = 0;

    @Column()
    collectedTopic: number = 0;

    @Column()
    likedTopic: number = 0;
}