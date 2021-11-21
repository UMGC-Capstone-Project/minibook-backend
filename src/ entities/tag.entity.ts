import { Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Photo } from "./photo.entity";
import { User } from "./user.entity";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User)
    user: User;

    @ManyToOne(type => Photo)
    photo: Photo;
    
}