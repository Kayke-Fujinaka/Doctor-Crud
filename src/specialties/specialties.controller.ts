import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSpecialtyDto } from './dtos/create-specialty.dto';
import { UpdateSpecialtyInformationDto } from './dtos/update-specialty.dto';
import { Speciality } from './entities/specialties.entity';
import { SpecialtiesService } from './services/specialties.service';

@Controller('specialties')
export class SpecialtiesController {
  constructor(private readonly specialtiesService: SpecialtiesService) {}

  @Post('/')
  public async create(@Body() body: CreateSpecialtyDto): Promise<Speciality> {
    return this.specialtiesService.create(body);
  }

  @Get('/')
  public async readAll(): Promise<Speciality[]> {
    return this.specialtiesService.readAll();
  }

  @Patch(':id')
  public async update(
    @Param('id')
    id: string,
    @Body() { name }: UpdateSpecialtyInformationDto,
  ): Promise<Speciality | string> {
    return this.specialtiesService.update(id, name);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<string> {
    return this.specialtiesService.delete(id);
  }
}
