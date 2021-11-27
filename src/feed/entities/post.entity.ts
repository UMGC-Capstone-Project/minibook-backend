import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'post' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(type => NewsPostEntity, newsboard => newsboard.posts)
  // newsboard: NewsPostEntity;

  @Column()
  message: string;

  // @OneToMany(type => Comment, comment => comment.post)
  // comments: Comment[];
}
