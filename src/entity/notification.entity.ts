import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class NotificationEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => UserEntity, user => user.notifications)
    user: UserEntity;
    
    @Column()
    code: number;
}