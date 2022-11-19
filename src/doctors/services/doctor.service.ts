import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Speciality } from 'src/specialities/entities/specialities.entity';
import { getRepository, In, Repository } from 'typeorm';
import { CreateDoctorDto } from '../dtos/create-doctors.dto';
import { UpdateDoctorInfoDto } from '../dtos/update-doctors.dto';
import { Doctor } from '../entities/doctors.entities';
import { DoctorZipCodeProvider } from '../providers/doctors-zipcode-provider';

@Injectable()
export class DoctorService extends TypeOrmQueryService<Doctor> {
  constructor(
    private readonly doctorZipCodeProvider: DoctorZipCodeProvider,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {
    super(doctorRepository, { useSoftDelete: true });
  }

  public async create({
    name,
    crm,
    landlinePhone,
    mobilePhone,
    zipCode,
    medicalSpeciality,
  }: CreateDoctorDto): Promise<Doctor | string> {
    const specialties = await this.findSpecialtiesInSpecialityRepository(
      medicalSpeciality,
    );

    if (specialties.length < 2) {
      return 'enter only valid specialties';
    }

    const body = {
      name,
      crm,
      landlinePhone,
      mobilePhone,
      zipCode,
      medicalSpeciality: specialties,
    };

    const { data } = await this.doctorZipCodeProvider.getZipCode(body.zipCode);

    const normalizeAddressData = {
      address: {
        street: data.logradouro,
        complement: data.complemento,
        district: data.bairro,
        city: data.localidade,
        state: data.uf,
      },
    };

    const isDoctorExists = await this.doctorRepository.findOne({
      where: { crm },
    });

    if (isDoctorExists) {
      throw new ConflictException('crm is already registered');
    }

    const doctorCreated = this.doctorRepository.save(
      Object.assign(body, normalizeAddressData),
    );

    return doctorCreated;
  }

  public async findSpecialtiesInSpecialityRepository(arrayWithSpecialtiesId) {
    return getRepository(Speciality).find({
      where: {
        id: In(arrayWithSpecialtiesId),
      },
    });
  }

  public readAll(): Promise<Doctor[]> {
    return this.doctorRepository.find({ relations: ['medicalSpeciality'] });
  }

  public async filterDoctor(searchByAttr: string): Promise<Doctor[] | string> {
    try {
      return await this.doctorRepository
        .createQueryBuilder('doctor')
        .leftJoinAndSelect('doctor.medicalSpeciality', 'medicalSpeciality')
        .where(searchByAttr)
        .getMany();
    } catch (error) {
      throw new NotFoundException(
        `we couldn't find atributte(s): ${searchByAttr}`,
      );
    }
  }

  public async update(
    id: number,
    {
      name,
      landlinePhone,
      mobilePhone,
      zipCode,
      medicalSpeciality,
    }: UpdateDoctorInfoDto,
  ): Promise<Doctor | string> {
    const body = {
      name,
      landlinePhone,
      mobilePhone,
      zipCode,
      medicalSpeciality,
    };

    const hasDoctorId = await this.doctorRepository.findOne({
      where: { id },
    }); // Criar uma função Reutilizável

    if (!hasDoctorId)
      throw new NotFoundException(`we couldn't find a doctor with id: ${id}`);

    await this.doctorRepository.update({ id }, body);

    await this.doctorZipCodeProvider.getZipCode(zipCode);

    return this.doctorRepository.findOne({ where: { id } });
  }

  public async delete(id: number): Promise<string> {
    const hasDoctorId = await this.doctorRepository.findOne({
      where: { id },
    });

    if (!hasDoctorId)
      throw new NotFoundException(`we couldn't find a doctor with id: ${id}`);

    await this.doctorRepository.delete({ id });

    return `the doctor with the id '${id}' was successfully deleted!`;
  }
}
