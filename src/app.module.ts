import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './configs/ormconfig';
import { DoctorModule } from './doctors/doctors.module';
import { SpecialitysModule } from './specialitys/specialitys.module';

@Module({
  imports: [DoctorModule, TypeOrmModule.forRoot(config), SpecialitysModule],
})
export class AppModule {}
