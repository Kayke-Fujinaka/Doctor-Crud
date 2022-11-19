import { IsString, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Speciality {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsString()
  @MaxLength(120)
  name: string;
}
