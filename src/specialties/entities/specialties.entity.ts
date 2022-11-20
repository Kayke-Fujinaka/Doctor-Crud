import { IsNumber, IsString, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Speciality {
  @PrimaryGeneratedColumn('increment')
  @IsNumber()
  id: number;

  @Column()
  @IsString()
  @MaxLength(120)
  name: string;
}
