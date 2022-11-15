import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './configs/ormconfig';
import { DoctorModule } from './doctors/doctor.module';

@Module({
  imports: [DoctorModule, TypeOrmModule.forRoot(config)],
})
export class AppModule {}
