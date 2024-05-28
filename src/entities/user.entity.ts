import { Column, Entity } from 'typeorm';

@Entity()
export class User {
  @Column()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;
}
