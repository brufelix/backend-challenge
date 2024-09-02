import { Address } from './address.entity';
import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import 'reflect-metadata';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 100,
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    length: 150,
    unique: true,
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column({
    length: 100,
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

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
