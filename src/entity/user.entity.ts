import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as argon2 from "argon2";
import { FriendEntity } from "./friend.entity";
import { NewsboardEntity } from "./newsboard.entity";
import { NotificationEntity } from "./notification.entity";
import { PhotoEntity } from "./photo.entity";
import { ProfileEntity } from "./profile.entity";

@Entity({ name: 'users' })
export class UserEntity {

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

    // @OneToOne(type => ProfileEntity, profile => profile.user)
    // profile: ProfileEntity;

    // @OneToMany(type => PhotoEntity, photo => photo.user)
    // photos: PhotoEntity[];

    // @OneToMany(type => FriendEntity, friend => friend.user)
    // friends: FriendEntity[];

    // @OneToOne(type => NewsboardEntity, newsboard => newsboard.user)
    // newsboard: NewsboardEntity;

    // @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    // public created_at: Date;

    // @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    // public updated_at: Date;

    // @OneToOne(type => Settings, settings => settings.user)
    // settings: Settings;

    // @OneToMany(type => NotificationEntity, notification => notification.user)
    // notifications: NotificationEntity[]

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password)
    }
}