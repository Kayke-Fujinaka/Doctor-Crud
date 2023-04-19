import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Address } from '@addresses/infra/typeorm/entities/address.entity';
import { Specialty } from '@specialties/infra/typeorm/entities/specialty.entity';

@Entity('doctors')
export class Doctor {
  @PrimaryColumn()
  crm: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cellphoneNumber: string;

  @ManyToOne(() => Address, (address) => address.zipCode)
  @JoinColumn({
    name: 'zipCode',
    referencedColumnName: 'zipCode',
    foreignKeyConstraintName: 'FKDoctorAddress',
  })
  zipCode: string;

  @ManyToMany(() => Specialty)
  @JoinTable({
    name: 'doctors_specialties',
    joinColumns: [{ name: 'crm' }],
    inverseJoinColumns: [{ name: 'specialty' }],
  })
  medicalSpecialties: Specialty[];

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
