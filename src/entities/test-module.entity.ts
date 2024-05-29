import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
}
