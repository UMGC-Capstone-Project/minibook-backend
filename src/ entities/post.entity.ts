import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NewsBoard } from "./newsboard.entity";
import { Comment } from './comment.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => NewsBoard, newsboard => newsboard.posts)
    newsboard: NewsBoard;

    @Column()
    message: string;

    @OneToMany(type => Comment, comment => comment.post)
    comments: Comment[];
}