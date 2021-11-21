import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Notification {

    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => User, user => user.notifications)
    user: User;
    
    @Column()
    code: number;
}