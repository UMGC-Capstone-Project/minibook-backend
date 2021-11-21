import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User, Location } from "./";

@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("double")
    views: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    birthday: Date;

    @Column()
    phoneNumber: string;

    @Column()
    gender: number;

    @OneToOne(type => Location)
    location: Location

    @Column()
    age: number;

    @Column()
    isPublished: boolean;

    @OneToOne(type => User, user => user.profile)
    @JoinColumn()
    user: User;
}