import { Module } from '@nestjs/common';
import { SpecialtiesRepository } from '@specialties/infra/typeorm/repositories/specialties.repository';
import { Repository } from 'typeorm';

@Module({
  providers: [Repository, SpecialtiesRepository],
  exports: [Repository, SpecialtiesRepository],
})
export class DatabaseModule {}
