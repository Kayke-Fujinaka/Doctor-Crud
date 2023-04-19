import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import {
  CreateSpecialtyUseCase,
  DeleteSpecialtyUseCase,
  FilterByPropertiesUseCase,
  FindAllSpecialtiesUseCase,
  FindByNameUseCase,
  UpdateSpecialtyUseCase,
} from '@specialties/use-cases';
import { AppModule } from '../../../../app.module';

describe('Specialties Cotroller', () => {
  const findAllSpecialtiesUseCase = {
    execute: () => [
      { id: '123456', name: 'Otorrino' },
      { id: '678910', name: 'Odontologista' },
    ],
  };

  const findByNameUseCase = {
    execute: () => ({ id: '123456', name: 'Otorrino' }),
  };

  const filterByPropertiesUseCase = {
    execute: () => [{ id: '123456', name: 'Otorrino' }],
  };

  const createSpecialtyUseCase = {
    execute: () => [{ id: '123456', name: 'Otorrino' }],
  };

  const deleteSpecialtyUseCase = { execute: () => 204 };

  const updateSpecialtyUseCase = {
    execute: () => [{ id: '123456', name: 'Otorrino' }],
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(FindAllSpecialtiesUseCase)
      .useValue(findAllSpecialtiesUseCase)
      .overrideProvider(FindByNameUseCase)
      .useValue(findByNameUseCase)
      .overrideProvider(FilterByPropertiesUseCase)
      .useValue(filterByPropertiesUseCase)
      .overrideProvider(DeleteSpecialtyUseCase)
      .useValue(deleteSpecialtyUseCase)
      .overrideProvider(CreateSpecialtyUseCase)
      .useValue(createSpecialtyUseCase)
      .overrideProvider(UpdateSpecialtyUseCase)
      .useValue(updateSpecialtyUseCase)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('findAll specialties', () => {
    it('should be able to return an array of specialties', async () => {
      return request(app.getHttpServer())
        .get('/specialty/all')
        .expect(200)
        .expect(findAllSpecialtiesUseCase.execute());
    });
  });

  describe('find specialty by name', () => {
    it('should be able to return a specialty', () => {
      return request(app.getHttpServer())
        .get('/specialty/Otorrino')
        .expect(200)
        .expect(findByNameUseCase.execute());
    });
  });

  describe('filter specialties by properties', () => {
    it('should be able to return an array of specialties that match the filter criteria', () => {
      return request(app.getHttpServer())
        .get('/specialty/filter')
        .query({ name: 'Oto', id: '123' })
        .expect(200)
        .expect(filterByPropertiesUseCase.execute());
    });
  });

  describe('create specialty', () => {
    it('should be able to return a array with the created specialty', () => {
      return request(app.getHttpServer())
        .post('/specialty')
        .expect(201)
        .expect(createSpecialtyUseCase.execute());
    });
  });

  describe('delete specialty', () => {
    it('should be able to return 204 status code when a specialty is deleted', () => {
      return request(app.getHttpServer())
        .delete('/specialty/123456')
        .expect(deleteSpecialtyUseCase.execute());
    });
  });

  describe('update specialty', () => {
    it('should be able to return the updated specialty', () => {
      return request(app.getHttpServer())
        .put('/specialty')
        .expect(200)
        .expect(updateSpecialtyUseCase.execute());
    });
  });
});
