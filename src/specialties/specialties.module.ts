import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpecialtiesController } from '@shared/infra/http/controllers/specialties.controller';
import { Specialty } from './infra/typeorm/entities/specialty.entity';
import { SpecialtiesRepository } from './infra/typeorm/repositories/specialties.repository';
import { ISpecialtiesRepository } from './interfaces';
import {
  CreateSpecialtyUseCase,
  DeleteSpecialtyUseCase,
  FilterByPropertiesUseCase,
  FindAllSpecialtiesUseCase,
  FindByNameUseCase,
  UpdateSpecialtyUseCase,
} from './use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([Specialty])],
  controllers: [SpecialtiesController],
  providers: [
    CreateSpecialtyUseCase,
    FindAllSpecialtiesUseCase,
    FindByNameUseCase,
    FilterByPropertiesUseCase,
    UpdateSpecialtyUseCase,
    DeleteSpecialtyUseCase,
    {
      provide: ISpecialtiesRepository,
      useClass: SpecialtiesRepository,
    },
  ],
  exports: [TypeOrmModule, ISpecialtiesRepository],
})
export class SpecialtiesModule {}
