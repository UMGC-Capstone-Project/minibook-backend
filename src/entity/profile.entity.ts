import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { LocationEntity } from "./location.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class ProfileEntity {

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

    @OneToOne(type => LocationEntity)
    location: LocationEntity

    @Column()
    age: number;

    @Column()
    isPublished: boolean;

    // @OneToOne(type => UserEntity, user => user.profile)
    // @JoinColumn()
    // user: UserEntity;
}