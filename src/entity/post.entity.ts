import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommentEntity } from "./comment.entity";
import { NewsboardEntity } from "./newsboard.entity";

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => NewsboardEntity, newsboard => newsboard.posts)
    newsboard: NewsboardEntity;

    @Column()
    message: string;

    @OneToMany(type => CommentEntity, comment => comment.post)
    comments: CommentEntity[];
}