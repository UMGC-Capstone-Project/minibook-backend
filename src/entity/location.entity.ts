import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfileEntity } from "./profile.entity";

@Entity()
export class LocationEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string;

    @Column()
    country: string;
    
    @OneToOne(type => ProfileEntity, profile => profile.location)
    @JoinColumn()
    profile: ProfileEntity;

}