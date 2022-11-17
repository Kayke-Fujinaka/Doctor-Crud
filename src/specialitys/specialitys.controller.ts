import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { SpecialitysService } from './services/specialitys.service';

@Controller('specialitys')
export class SpecialitysController {
  constructor(private readonly specialitysService: SpecialitysService) {}

  @Post()
  create(@Body() createSpecialityDto: CreateSpecialityDto) {
    return this.specialitysService.create(createSpecialityDto);
  }

  @Get()
  findAll() {
    return this.specialitysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialitysService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpecialityDto: UpdateSpecialityDto,
  ) {
    return this.specialitysService.update(+id, updateSpecialityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialitysService.remove(+id);
  }
}
