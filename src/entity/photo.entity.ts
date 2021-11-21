import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, TableForeignKey } from "typeorm";
import { TagEntity } from "./tag.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class PhotoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;

    @Column("text")
    description: string;

    @Column()
    filename: string;

    @Column("double")
    views: number;

    @Column()
    isPublished: boolean;

    @OneToMany(type => TagEntity, tag => tag.photo)
    tags: TagEntity[];

    @ManyToOne(type => UserEntity, user => user.photos)
    user: UserEntity;
}