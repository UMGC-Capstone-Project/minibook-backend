import { Entity, ManyToOne, PrimaryGeneratedColumn,  } from "typeorm";
import { Post } from "./";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Post, post =>  post.comments)
    post: Post;
}