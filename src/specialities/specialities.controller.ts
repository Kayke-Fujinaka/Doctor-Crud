import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSpecialityDto } from './dtos/create-speciality.dto';
import { UpdateSpecialityDto } from './dtos/update-speciality.dto';
import { SpecialitiesService } from './services/specialities.service';

@Controller('specialities')
export class SpecialitiesController {
  constructor(private readonly SpecialitiesService: SpecialitiesService) {}

  @Post()
  create(@Body() createSpecialityDto: CreateSpecialityDto) {
    return this.SpecialitiesService.create(createSpecialityDto);
  }

  @Get()
  findAll() {
    return this.SpecialitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.SpecialitiesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpecialityDto: UpdateSpecialityDto,
  ) {
    return this.SpecialitiesService.update(+id, updateSpecialityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.SpecialitiesService.remove(+id);
  }
}
