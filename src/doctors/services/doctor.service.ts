import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosError } from 'axios';
import { Speciality } from 'src/specialties/entities/specialties.entity';
import { getRepository, In, Repository } from 'typeorm';
import { CreateDoctorDto } from '../dtos/create-doctors.dto';
import { UpdateDoctorInfoDto } from '../dtos/update-doctors.dto';
import { Doctor } from '../entities/doctors.entities';
import { DoctorZipCodeProvider } from '../providers/doctors-zipcode-provider';

const SPECIALTIES_REQUIRED = 2;

@Injectable()
export class DoctorService extends TypeOrmQueryService<Doctor> {
  constructor(
    private readonly doctorZipCodeProvider: DoctorZipCodeProvider,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {
    super(doctorRepository, { useSoftDelete: true });
  }

  public async create(createDoctor: CreateDoctorDto): Promise<Doctor> {
    const { crm, medicalSpeciality, zipCode } = createDoctor;

    const isDoctorAlreadyRegistered = await this.doctorRepository.findOne({
      where: { crm },
    });

    if (isDoctorAlreadyRegistered) {
      throw new ConflictException('crm is already registered');
    }

    const specialties = await this.findSpecialties(medicalSpeciality);

    const createDoctorData = {
      ...createDoctor,
      medicalSpeciality: specialties,
    };

    const { data } = await this.doctorZipCodeProvider.getZipCode(zipCode);

    const addressData = {
      zipCode,
      street: data.logradouro,
      complement: data.complemento,
      district: data.bairro,
      city: data.localidade,
      state: data.uf,
    };

    return this.doctorRepository.save(
      Object.assign(createDoctorData, addressData),
    );
  }

  public readAll(): Promise<Doctor[]> {
    return this.doctorRepository.find({ relations: ['medicalSpeciality'] });
  }

  public async filter(searchByAttr: {
    queryParams: string | number[];
  }): Promise<Doctor[] | string> {
    try {
      return await this.doctorRepository
        .createQueryBuilder('doctor')
        .leftJoinAndSelect('doctor.medicalSpeciality', 'medicalSpeciality')
        .where(searchByAttr)
        .getMany();
    } catch (error) {
      throw new HttpException(
        `we couldn't find atributte(s)`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async update(
    id: number,
    {
      medicalSpeciality,
      zipCode,
      landlinePhone,
      mobilePhone,
      name,
    }: UpdateDoctorInfoDto,
  ): Promise<Doctor> {
    const doctor = await this.findDoctorById(id);

    const specialties = await this.findSpecialties(medicalSpeciality);

    const { data } = await this.doctorZipCodeProvider.getZipCode(zipCode);

    const updatedDoctorInfo = {
      ...doctor,
      name,
      landlinePhone,
      mobilePhone,
      medicalSpeciality: specialties,
      street: data.logradouro,
      complement: data.complemento,
      district: data.bairro,
      city: data.localidade,
      state: data.uf,
    };

    return this.doctorRepository.save(updatedDoctorInfo);
  }

  public async delete(id: number): Promise<string> {
    await this.findDoctorById(id);

    await this.doctorRepository.softDelete({ id });

    return `the doctor with the id '${id}' was successfully deleted!`;
  }

  public async findSpecialties(arrayWithSpecialtiesId: Speciality[]) {
    const specialties = await getRepository(Speciality).find({
      where: {
        id: In(arrayWithSpecialtiesId),
      },
    });

    if (specialties.length < SPECIALTIES_REQUIRED) {
      throw new HttpException(
        'enter two valid specialties',
        HttpStatus.LENGTH_REQUIRED,
      );
    }

    return specialties;
  }

  public async findDoctorById(id: number): Promise<Speciality | AxiosError> {
    const isDoctorAlreadyExists = await this.doctorRepository.findOne({
      where: { id },
      relations: ['medicalSpeciality'],
    });

    if (!isDoctorAlreadyExists) {
      throw new NotFoundException(`we couldn't find a doctor with id: ${id}`);
    }

    return isDoctorAlreadyExists;
  }
}
