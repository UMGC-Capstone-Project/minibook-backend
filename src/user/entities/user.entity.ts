import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as argon2 from 'argon2';
import { NewsPostEntity } from '../../feed/entities/news-post.entity';

import { ApiProperty } from '@nestjs/swagger';
import { PublicFileEntity } from 'src/file/entities/public-file.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id?: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  @ApiProperty()
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: false,
  })
  @ApiProperty()
  displayname: string;

  // @OneToOne(type => ProfileEntity, profile => profile.user)
  // profile: ProfileEntity;

  // @OneToMany(type => PhotoEntity, photo => photo.user)
  // photos: PhotoEntity[];

  // @OneToMany(type => FriendEntity, friend => friend.user)
  // friends: FriendEntity[];

  @OneToMany(
    (type) => NewsPostEntity,
    (newsPostEntity) => newsPostEntity.author,
  )
  newsposts: NewsPostEntity[];

  @JoinColumn()
  @OneToOne(() => PublicFileEntity, { eager: true, nullable: true })
  public avatar?: PublicFileEntity;

  // @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  // public created_at: Date;

  // @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  // public updated_at: Date;

  // @OneToOne(type => Settings, settings => settings.user)
  // settings: Settings;

  // @OneToMany(type => NotificationEntity, notification => notification.user)
  // notifications: NotificationEntity[]

  @BeforeInsert()
  private async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  // @AfterInsert()
  // async createNewsboard() {
  //     const newsboardRepository = getRepository(NewsPostEntity);
  //     const _newsboard = new NewsPostEntity();
  //     _newsboard.isPublished = false;
  //     // _newsboard.user = this;
  //     // _newsboard.views = 0;
  //     newsboardRepository.save(_newsboard);
  // }
}
