import { type } from "os";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NewsboardEntity } from "./newsboard.entity";



@Entity({name: 'post'})
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => NewsboardEntity, newsboard => newsboard.posts)
    newsboard: NewsboardEntity;

    @Column()
    message: string;

    // @OneToMany(type => Comment, comment => comment.post)
    // comments: Comment[];
}