import { RoleEnum } from 'src/common/enums';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class User extends Base {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 30, unique: true })
  loginId: string;

  @Column({ length: 30 })
  username: string;

  @Column({ length: 120 })
  password: string;

  @Column({ type: 'enum', enum: RoleEnum })
  type: RoleEnum;
}
