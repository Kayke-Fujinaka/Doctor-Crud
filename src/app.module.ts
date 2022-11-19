import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './configs/ormconfig';
import { DoctorModule } from './doctors/doctors.module';
import { SpecialtiesModule } from './specialties/specialities.module';

@Module({
  imports: [DoctorModule, TypeOrmModule.forRoot(config), SpecialtiesModule],
})
export class AppModule {}
