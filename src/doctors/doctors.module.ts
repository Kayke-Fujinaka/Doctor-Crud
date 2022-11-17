import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Speciality } from 'src/specialities/entities/specialities.entity';
import { DoctorController } from './doctors.controller';
import { Doctor } from './entities/doctors.entities';
import { DoctorZipCodeProvider } from './providers/doctors-zipcode-provider';
import { DoctorService } from './services/doctor.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Doctor, Speciality])],
  controllers: [DoctorController],
  providers: [DoctorService, DoctorZipCodeProvider],
})
export class DoctorModule {}
