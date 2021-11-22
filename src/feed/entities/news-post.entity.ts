import { UserEntity } from "../../user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'news-post' })
export class NewsPostEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    // @Column("double")
    // views: number;

    @Column()
    body: string;

    @Column({ default: true })
    isPublished: boolean;

    @ManyToOne(type => UserEntity, userEntity => userEntity.newsposts)
    author: UserEntity;
}