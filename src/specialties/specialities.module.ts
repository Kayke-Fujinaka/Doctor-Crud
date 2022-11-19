import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Speciality } from './entities/specialties.entity';
import { SpecialitiesService } from './services/specialties.service';
import { SpecialitiesController } from './specialities.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Speciality])],
  controllers: [SpecialitiesController],
  providers: [SpecialitiesService],
})
export class SpecialtiesModule {}
