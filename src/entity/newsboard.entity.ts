import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { PostEntity } from "./post.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class NewsboardEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("double")
    views: number;

    @OneToMany(type => PostEntity, post => post.newsboard)
    posts: PostEntity[];

    @Column()
    isPublished: boolean;

    // @OneToOne(type => UserEntity, user => user.newsboard)
    // @JoinColumn()
    // user: UserEntity;
}