import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Newsboard, Friend, Photo, Profile, Notification } from "./";
import * as argon2 from "argon2";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true
    })
    email: string;

    @Column({
        type: 'varchar', 
        nullable: false 
    })
    password: string;

    @Column({
        type: 'varchar', 
        nullable: false,
        unique: true
    })
    displayname: string;

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

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password)
    }
}