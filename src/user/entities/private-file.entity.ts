import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class PrivateFileEntity {
  @PrimaryGeneratedColumn()
  public id: number;
}
