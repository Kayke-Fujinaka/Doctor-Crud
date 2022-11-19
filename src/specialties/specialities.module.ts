import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Speciality } from './entities/specialities.entity';
import { SpecialitiesService } from './services/specialities.service';
import { SpecialitiesController } from './specialities.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Speciality])],
  controllers: [SpecialitiesController],
  providers: [SpecialitiesService],
})
export class SpecialitiesModule {}
