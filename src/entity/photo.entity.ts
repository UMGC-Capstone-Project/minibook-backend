import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, TableForeignKey } from "typeorm";
import { User, Tag } from "./";

@Entity()
export class Photo {

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

    @OneToMany(type => Tag, tag => tag.photo)
    tags: Tag[];

    @ManyToOne(type => User, user => user.photos)
    user: User;
}