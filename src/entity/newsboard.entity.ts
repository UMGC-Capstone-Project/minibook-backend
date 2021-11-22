import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as argon2 from "argon2";
import { UserEntity } from "./user.entity";
import { PostEntity } from "./post.entity";

@Entity({ name: 'newsboard' })
export class NewsboardEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column("double")
    views: number;

    @OneToMany(type => PostEntity, post => post.newsboard)
    posts: PostEntity[];

    @Column()
    isPublished: boolean;

    @OneToOne(type => UserEntity, user => user.newsboard)
    user: UserEntity;
}