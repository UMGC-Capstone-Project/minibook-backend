import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Newsboard, Friend, Photo, Profile, Notification } from "./";

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

    @OneToOne(type => Newsboard, newsboard => newsboard.user)
    newsboard: Newsboard;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

    // @OneToOne(type => Settings, settings => settings.user)
    // settings: Settings;

    @OneToMany(type => Notification, notification => notification.user)
    notifications: Notification[]
}