import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { User, Post } from "./";

@Entity()
export class Newsboard {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("double")
    views: number;

    @OneToMany(type => Post, post => post.newsboard)
    posts: Post[];

    @Column()
    isPublished: boolean;

    @OneToOne(type => User, user => user.newsboard)
    @JoinColumn()
    user: User;
}