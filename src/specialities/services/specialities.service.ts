import { Injectable } from '@nestjs/common';
import { CreateSpecialityDto } from '../dtos/create-speciality.dto';
import { UpdateSpecialityDto } from '../dtos/update-speciality.dto';

@Injectable()
export class SpecialitiesService {
  create(createSpecialityDto: CreateSpecialityDto) {
    return 'This action adds a new speciality';
  }

  findAll() {
    return `This action returns all Specialities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} speciality`;
  }

  update(id: number, updateSpecialityDto: UpdateSpecialityDto) {
    return `This action updates a #${id} speciality`;
  }

  remove(id: number) {
    return `This action removes a #${id} speciality`;
  }
}
