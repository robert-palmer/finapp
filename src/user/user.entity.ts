import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Profile } from 'src/profile/profile.entity';
import { UserRole } from './enums/userRole';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.user })
  role: UserRole;

  @OneToOne(
    () => Profile,
    profile => profile.user,
  )
  @JoinColumn()
  profile: Profile;
}
