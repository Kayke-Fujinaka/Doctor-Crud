import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './configs/ormconfig';
import { DoctorModule } from './doctors/doctors.module';
import { SpecialitiesModule } from './specialties/specialities.module';

@Module({
  imports: [DoctorModule, TypeOrmModule.forRoot(config), SpecialitiesModule],
})
export class AppModule {}
