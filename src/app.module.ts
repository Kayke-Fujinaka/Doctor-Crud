import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DoctorsModule } from './doctors/doctors.module';
import { ormconfig } from './ormconfig';
import { SpecialtiesModule } from './specialties/specialties.module';

require('dotenv/config');
@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), SpecialtiesModule, DoctorsModule],
})
export class AppModule {}
