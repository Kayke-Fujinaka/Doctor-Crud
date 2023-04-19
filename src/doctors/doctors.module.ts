import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Address } from '@addresses/infra/typeorm/entities/address.entity';
import { AddressesRepository } from '@addresses/infra/typeorm/repositories/addresses.repository';
import { IAddressesRepository } from '@addresses/interfaces';
import { DoctorsController } from '@shared/infra/http/controllers/doctors.controller';
import { AddressProvider } from '@shared/providers/address-provider';
import { IAddressProvider } from '@shared/providers/interfaces/IAddressProvider';
import { SpecialtiesModule } from '@specialties/specialties.module';
import { Doctor } from './infra/typeorm/entities/doctor.entity';
import { DoctorsRepository } from './infra/typeorm/repositories/doctors.repository';
import { IDoctorsRepository } from './interfaces';

import {
  AddSpecialtiesUseCase,
  CreateDoctorUseCase,
  DeleteDoctorUseCase,
  FilterByPropertiesUseCase,
  FindAllDoctorsUseCase,
  FindByCRMUseCase,
  UpdateDoctorUseCase,
} from './use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, Address]), SpecialtiesModule],
  controllers: [DoctorsController],
  providers: [
    CreateDoctorUseCase,
    FindAllDoctorsUseCase,
    FindByCRMUseCase,
    FilterByPropertiesUseCase,
    UpdateDoctorUseCase,
    DeleteDoctorUseCase,
    AddSpecialtiesUseCase,
    {
      provide: IAddressProvider,
      useClass: AddressProvider,
    },
    {
      provide: IDoctorsRepository,
      useClass: DoctorsRepository,
    },
    {
      provide: IAddressesRepository,
      useClass: AddressesRepository,
    },
  ],
  exports: [TypeOrmModule],
})
export class DoctorsModule {}
