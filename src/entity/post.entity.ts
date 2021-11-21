import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Newsboard, Comment } from "./";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => Newsboard, newsboard => newsboard.posts)
    newsboard: Newsboard;

    @Column()
    message: string;

    @OneToMany(type => Comment, comment => comment.post)
    comments: Comment[];
}