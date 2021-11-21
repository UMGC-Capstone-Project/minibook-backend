import { Settings } from "http2";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Friend } from "./friend.entity";
import { NewsBoard } from "./newsboard.entity";
import { Photo } from "./photo.entity";
import { Profile } from "./profile.entity";
import {Notification} from "./notification.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToOne(type => Profile, profile => profile.user)
    profile: Profile;

    @OneToMany(type => Photo, photo => photo.user)
    photos: Photo[];

    @OneToMany(type => Friend, friend => friend.user)
    friends: Friend[];

    @OneToOne(type => NewsBoard, newsboard => newsboard.user)
    newsboard: NewsBoard;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

    // @OneToOne(type => Settings, settings => settings.user)
    // settings: Settings;

    @OneToMany(type => Notification, notification => notification.user)
    notifications: Notification[]
}