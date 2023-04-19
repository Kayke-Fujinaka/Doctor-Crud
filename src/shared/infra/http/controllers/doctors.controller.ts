import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { FilterByPropertiesDoctorDTO } from '@doctors/dtos';
import { Doctor } from '@doctors/infra/typeorm/entities/doctor.entity';
import {
  IAddSpecialtiesRequest,
  ICreateDoctorRequest,
  IUpdateDoctorRequest,
} from '@doctors/interfaces';
import {
  AddSpecialtiesUseCase,
  CreateDoctorUseCase,
  DeleteDoctorUseCase,
  FilterByPropertiesUseCase,
  FindAllDoctorsUseCase,
  FindByCRMUseCase,
  UpdateDoctorUseCase,
} from '@doctors/use-cases';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiTags('doctors')
@Controller('doctor')
export class DoctorsController {
  constructor(
    private createDoctorUseCase: CreateDoctorUseCase,
    private updateDoctorUseCase: UpdateDoctorUseCase,
    private findAllDoctorsUseCase: FindAllDoctorsUseCase,
    private findByCRMUseCase: FindByCRMUseCase,
    private filterByPropertiesUseCase: FilterByPropertiesUseCase,
    private deleteDoctorUseCase: DeleteDoctorUseCase,
    private addSpecialtiesUseCase: AddSpecialtiesUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Médico cadastrado com sucesso!',
    schema: {
      $ref: getSchemaPath(ICreateDoctorRequest),
    },
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Este CRM e/ou e-mail já foi cadastrado',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'CEP e/ou Especialidade não encontrado(a)!',
  })
  create(
    @Body()
    data: ICreateDoctorRequest,
  ): Promise<Doctor> {
    return this.createDoctorUseCase.execute(data);
  }

  @Post('/add-specialties')
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Especialidade(s) cadastrada(s) com sucesso!',
    schema: {
      $ref: getSchemaPath(ICreateDoctorRequest),
    },
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Não foi possível adicionar a(s) especialidade(s)! ',
  })
  addSpecialties(
    @Body()
    { crm, medicalSpecialties }: IAddSpecialtiesRequest,
  ): Promise<Doctor> {
    return this.addSpecialtiesUseCase.execute({ crm, medicalSpecialties });
  }

  @Put(':crm')
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Médico alterado com sucesso!',
    schema: {
      $ref: getSchemaPath(ICreateDoctorRequest),
    },
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Não foi possível alterar o médico!',
  })
  update(@Param('crm') crm: string, @Body() data: IUpdateDoctorRequest) {
    return this.updateDoctorUseCase.execute(crm, data);
  }

  @Get('/all')
  @ApiExtraModels(ICreateDoctorRequest)
  @ApiOkResponse({
    status: HttpStatus.OK,
    schema: {
      $ref: getSchemaPath(ICreateDoctorRequest),
    },
  })
  findAll(): Promise<Doctor[]> {
    return this.findAllDoctorsUseCase.execute();
  }

  @Get('/filter')
  @ApiOkResponse({
    status: HttpStatus.OK,
    schema: {
      $ref: getSchemaPath(ICreateDoctorRequest),
    },
  })
  filterByProperties(
    @Query() properties: FilterByPropertiesDoctorDTO,
  ): Promise<Doctor[]> {
    return this.filterByPropertiesUseCase.execute(properties);
  }

  @Get(':crm')
  @ApiOkResponse({
    status: HttpStatus.OK,
    schema: {
      $ref: getSchemaPath(ICreateDoctorRequest),
    },
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Não foi possível encontrar o médico!',
  })
  findByCrm(@Param('crm') crm: string): Promise<Doctor> {
    return this.findByCRMUseCase.execute(crm);
  }

  @Delete(':crm')
  @ApiNoContentResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Médico deletado com sucesso!',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Não foi possível encontrar o médico!',
  })
  @HttpCode(204)
  delete(@Param('crm') crm: string): Promise<void> {
    return this.deleteDoctorUseCase.execute(crm);
  }
}
