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
import { CreateDoctorDto } from 'src/doctors/dtos/create-doctor.dto';
import { Doctor } from 'src/doctors/entities/doctor.entities';
import { UpdateDoctorInfoDto } from './dtos/update-doctor.dto';
import { DoctorService } from './services/doctor.service';

@Controller('/doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('create')
  @HttpCode(201)
  public async create(
    @Body() body: CreateDoctorDto,
  ): Promise<{ data: Doctor | string }> {
    return await this.doctorService.create(body);
  }

  @Get('allList')
  public async readAll(): Promise<{ doctors: Doctor[] }> {
    return await this.doctorService.readAll();
  }

  @Get(':id')
  public async readById(@Param('id') id: number): Promise<{ data: Doctor }> {
    return await this.doctorService.readById(id);
  }

  @Patch('updateInfo/:id')
  public async update(
    @Param('id')
    id: number,
    @Body() body: UpdateDoctorInfoDto,
  ): Promise<{ data: Doctor | string }> {
    return await this.doctorService.update(id, body);
  }

  @Delete('delete/:id')
  public async delete(
    @Param('id')
    id: number,
  ): Promise<{ data: string }> {
    return await this.doctorService.delete(id);
  }
}
