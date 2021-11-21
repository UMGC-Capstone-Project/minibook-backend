import { Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PhotoEntity } from "./photo.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class TagEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => UserEntity)
    user: UserEntity;

    @ManyToOne(type => PhotoEntity)
    photo: PhotoEntity;
    
}