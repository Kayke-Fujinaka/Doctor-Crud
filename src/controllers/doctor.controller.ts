import {
  Body,
  Controller,
  Delete,
  Get,
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

  @Post()
  public async create(
    @Body() body: DoctorSchema,
  ): Promise<{ data: DoctorModel }> {
    const doctorCreated = await this.model.save(body);
    return { data: doctorCreated };
  }

  @Get()
  public async read(): Promise<{ doctors: DoctorModel[] }> {
    const list = await this.model.find();
    return { doctors: list };
  }

  @Patch('updateInfo/:id')
  public async update(
    @Param('id')
    id: number,
    @Body() body: DoctorSchema,
  ) {
    const person = await this.model.findOne({ where: { id } });

    if (!person)
      throw new NotFoundException(`Não achamos um doutor com o id ${id}`);

    await this.model.update({ id }, body);

    return { data: await this.model.findOne({ where: { id } }) };
  }

  @Delete(':id')
  public delete(): any {
    return { data: 'Delete!!!' };
  }
}
