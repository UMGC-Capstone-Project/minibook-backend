import { Entity, ManyToOne, PrimaryGeneratedColumn,  } from "typeorm";
import { PostEntity } from "./post.entity";

@Entity()
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => PostEntity, post =>  post.comments)
    post: PostEntity;
}