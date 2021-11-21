import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./";

@Entity()
export class Location {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string;

    @Column()
    country: string;
    
    @OneToOne(type => Profile, profile => profile.location)
    @JoinColumn()
    profile: Profile;

}