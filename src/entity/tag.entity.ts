import { Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User, Photo } from "./";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User)
    user: User;

    @ManyToOne(type => Photo)
    photo: Photo;
    
}