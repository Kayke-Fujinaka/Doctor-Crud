import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDoctorDto } from 'src/doctors/dtos/create-doctors.dto';
import { Doctor } from 'src/doctors/entities/doctors.entities';
import { UpdateDoctorInfoDto } from './dtos/update-doctors.dto';
import { DoctorService } from './services/doctor.service';

@Controller('/doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('/')
  @HttpCode(201)
  public async create(@Body() body: CreateDoctorDto): Promise<Doctor | string> {
    return await this.doctorService.create(body);
  }

  @Get('/')
  public async readAll(): Promise<Doctor[]> {
    return await this.doctorService.readAll();
  }

  @Get(':id')
  public async readById(@Param('id') id: number): Promise<Doctor> {
    return await this.doctorService.readById(id);
  }

  @Patch(':id')
  public async update(
    @Param('id')
    id: number,
    @Body() body: UpdateDoctorInfoDto,
  ): Promise<Doctor | string> {
    return await this.doctorService.update(id, body);
  }

  @Delete(':id')
  public async delete(
    @Param('id')
    id: number,
  ): Promise<string> {
    return await this.doctorService.delete(id);
  }
}
