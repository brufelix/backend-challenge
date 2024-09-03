import { User } from './user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import 'reflect-metadata';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 100,
    type: 'varchar',
    nullable: false,
  })
  country: string;

  @Column({
    length: 200,
    type: 'varchar',
    nullable: false,
  })
  neighborhood: string;

  @Column({
    length: 100,
    type: 'varchar',
    nullable: false,
  })
  city: string;

  @Column({
    length: 100,
    type: 'varchar',
    nullable: false,
  })
  state: string;

  @Column({
    length: 9,
    type: 'varchar',
    nullable: false,
  })
  zipCode: string;

  @Column({
    length: 200,
    type: 'varchar',
    nullable: true,
  })
  complement: string;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  userId: string;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'createdAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'updatedAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
