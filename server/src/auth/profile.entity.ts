import { Photo } from "../file/photo.entity";
import { Entity, Index, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, BaseEntity } from "typeorm";
import { User } from "./user.entity";
import { UserGender, UserShowStatusSetting } from "./user.enum";

@Entity()
export class Profile extends BaseEntity {

    @Index()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: UserGender.UNKNOWN })
    gender: UserGender;

    @OneToOne(type => Photo, { eager: true })
    @JoinColumn()
    avatar: Photo;

    @OneToOne(type => User)
    user: User;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    mobile: string;

    @Column({ default: UserShowStatusSetting.NOTSHOW })
    onlineStatus: UserShowStatusSetting;

    @Column({ default: UserShowStatusSetting.NOTSHOW })
    showJoinTeam: UserShowStatusSetting;

    @Column({ default: UserShowStatusSetting.NOTSHOW })
    showPublishTopic: UserShowStatusSetting;

    @Column({ default: UserShowStatusSetting.NOTSHOW })
    showCreatedCCP: UserShowStatusSetting;

    @Column({ default: UserShowStatusSetting.NOTSHOW })
    showFavourite: UserShowStatusSetting;

    @Column({ default: UserShowStatusSetting.NOTSHOW })
    showLikedUser: UserShowStatusSetting;
    
}