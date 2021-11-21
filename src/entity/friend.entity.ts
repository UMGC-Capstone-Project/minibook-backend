import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class FriendEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("double")
    count: number;

    @OneToOne(type => UserEntity)
    friend: UserEntity;

    @ManyToOne(type => UserEntity, user => user.friends)
    user: UserEntity;
}