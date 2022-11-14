import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './configs/ormconfig';
import { DoctorModule } from './modules/doctor.module';

@Module({
  imports: [DoctorModule, TypeOrmModule.forRoot(config)],
})
export class AppModule {}
