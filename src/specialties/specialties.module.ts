import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Speciality } from './entities/specialties.entity';
import { SpecialitiesService } from './services/specialties.service';
import { SpecialtiesController } from './specialties.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Speciality])],
  controllers: [SpecialtiesController],
  providers: [SpecialitiesService],
})
export class SpecialtiesModule {}
