import { Doctor } from '@doctors/infra/typeorm/entities/doctor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('addresses')
export class Address {
  @PrimaryColumn()
  zipCode: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  neighborhood: string;

  @OneToMany(() => Doctor, (doctor) => doctor.zipCode)
  @JoinTable()
  doctors: Doctor[];

  @CreateDateColumn()
  created_at: Date;
}
