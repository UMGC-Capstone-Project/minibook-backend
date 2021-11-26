import {
    BeforeInsert,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import * as argon2 from 'argon2';
  import { NewsPostEntity } from '../../feed/entities/news-post.entity';
  
  @Entity({ name: 'user' })
  export class PhotoEntity {
  }