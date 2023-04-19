import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import {
  AddSpecialtiesUseCase,
  CreateDoctorUseCase,
  DeleteDoctorUseCase,
  FilterByPropertiesUseCase,
  FindAllDoctorsUseCase,
  FindByCRMUseCase,
  UpdateDoctorUseCase,
} from '@doctors/use-cases';
import { AppModule } from './../../../../app.module';

describe('Doctors Controller', () => {
  const findAllDoctorsUseCase = {
    execute: () => [
      { crm: '123456', name: 'Doctor1' },
      { crm: '678910', name: 'Doctor2' },
    ],
  };

  const findByCRMUseCase = {
    execute: () => ({ crm: '123456', name: 'Doctor' }),
  };

  const filterByPropertiesUseCase = {
    execute: () => [{ crm: '123456', name: 'Doctor1' }],
  };

  const createDoctorUseCase = {
    execute: () => [{ crm: '123456', name: 'Doctor1' }],
  };

  const deleteDoctorUseCase = { execute: () => 204 };

  const updateDoctorUseCase = {
    execute: () => [{ crm: '123456', name: 'UpdatedDoctor' }],
  };

  const addSpecialtiesUseCase = {
    execute: () => [
      { crm: '123456', name: 'Doctor', medicalSpecialties: ['newSpecialty'] },
    ],
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(FindAllDoctorsUseCase)
      .useValue(findAllDoctorsUseCase)
      .overrideProvider(FindByCRMUseCase)
      .useValue(findByCRMUseCase)
      .overrideProvider(FilterByPropertiesUseCase)
      .useValue(filterByPropertiesUseCase)
      .overrideProvider(DeleteDoctorUseCase)
      .useValue(deleteDoctorUseCase)
      .overrideProvider(CreateDoctorUseCase)
      .useValue(createDoctorUseCase)
      .overrideProvider(UpdateDoctorUseCase)
      .useValue(updateDoctorUseCase)
      .overrideProvider(AddSpecialtiesUseCase)
      .useValue(addSpecialtiesUseCase)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('findAll doctors', () => {
    it('should be able to return an array of doctors', async () => {
      return request(app.getHttpServer())
        .get('/doctor/all')
        .expect(200)
        .expect(findAllDoctorsUseCase.execute());
    });
  });

  describe('find doctor by crm', () => {
    it('should be able to return a doctor', () => {
      return request(app.getHttpServer())
        .get('/doctor/123456')
        .expect(200)
        .expect(findByCRMUseCase.execute());
    });
  });

  describe('filter doctors by properties', () => {
    it('should be able to return an array of doctors that match the filter criteria', () => {
      return request(app.getHttpServer())
        .get('/doctor/filter')
        .query({ name: 'Doc', crm: '123' })
        .expect(200)
        .expect(filterByPropertiesUseCase.execute());
    });
  });

  describe('create doctor', () => {
    it('should be able to return a array with the created doctor', () => {
      return request(app.getHttpServer())
        .post('/doctor')
        .expect(201)
        .expect(createDoctorUseCase.execute());
    });
  });

  describe('delete doctor', () => {
    it('should be able to return 204 status code when a doctor is deleted', () => {
      return request(app.getHttpServer())
        .delete('/doctor/123456')
        .expect(deleteDoctorUseCase.execute());
    });
  });

  describe('update doctor', () => {
    it('should be able to return the updated doctor', () => {
      return request(app.getHttpServer())
        .put('/doctor/123456')
        .expect(200)
        .expect(updateDoctorUseCase.execute());
    });
  });

  describe('Add specialties to doctor', () => {
    it('should be able to return a doctor and a spcialty is added', () => {
      return request(app.getHttpServer())
        .post('/doctor/add-specialties')
        .expect(201)
        .expect(addSpecialtiesUseCase.execute());
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
