import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from "typeorm";
import { User } from "./";

@Entity()
export class Friend {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("double")
    count: number;

    @OneToOne(type => User)
    friend: User;

    @ManyToOne(type => User, user => user.friends)
    user: User;
}