import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorModel } from 'src/models/doctor.model';
import { DoctorSchema } from 'src/schemas/doctor.schema';
import { Repository } from 'typeorm';

@Controller('/doctor')
export class DoctorController {
  constructor(
    @InjectRepository(DoctorModel) private model: Repository<DoctorModel>,
  ) {}

  @Post('create')
  @HttpCode(201)
  public async create(
    @Body() body: DoctorSchema,
  ): Promise<{ data: DoctorModel }> {
    const doctorCreated = await this.model.save(body);
    return { data: doctorCreated };
  }

  @Get('allList')
  public async readAll(): Promise<{ doctors: DoctorModel[] }> {
    const list = await this.model.find();
    return { doctors: list };
  }

  @Get(':id')
  public async readOne(@Param('id') id: number): Promise<any> {
    const doctor = await this.model.findOne({ where: { id } });
    return { data: doctor };
  }

  @Patch('updateInfo/:id')
  public async update(
    @Param('id')
    id: number,
    @Body() body: DoctorSchema,
  ): Promise<{ data: DoctorModel }> {
    const person = await this.model.findOne({ where: { id } });

    if (!person)
      throw new NotFoundException(`Não achamos um doutor com o id ${id}`);

    await this.model.update({ id }, body);

    return { data: await this.model.findOne({ where: { id } }) };
  }

  @Delete('delete/:id')
  public async delete(
    @Param('id')
    id: number,
  ): Promise<{ data: string }> {
    const person = await this.model.findOne({ where: { id } });

    if (!person)
      throw new NotFoundException(`Não achamos um doutor com o id ${id}`);

    await this.model.delete({ id });

    return { data: `A pessoa com o id ${id} foi deletada com sucesso!!!` };
  }
}
