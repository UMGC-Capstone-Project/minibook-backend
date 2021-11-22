import { type } from "os";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NewsPostEntity } from "./news-post.entity";



@Entity({name: 'post'})
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    // @ManyToOne(type => NewsPostEntity, newsboard => newsboard.posts)
    // newsboard: NewsPostEntity;

    @Column()
    message: string;

    // @OneToMany(type => Comment, comment => comment.post)
    // comments: Comment[];
}