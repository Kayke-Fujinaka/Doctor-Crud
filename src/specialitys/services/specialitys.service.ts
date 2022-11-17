import { Injectable } from '@nestjs/common';
import { CreateSpecialityDto } from '../dto/create-speciality.dto';
import { UpdateSpecialityDto } from '../dto/update-speciality.dto';

@Injectable()
export class SpecialitysService {
  create(createSpecialityDto: CreateSpecialityDto) {
    return 'This action adds a new speciality';
  }

  findAll() {
    return `This action returns all specialitys`;
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
