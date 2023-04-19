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

import {
  CreateSpecialtyDTO,
  FilterByPropertiesSpecialtyDTO,
  UpdateSpecialtyDTO,
} from '@specialties/dtos';

import { Specialty } from '@specialties/infra/typeorm/entities/specialty.entity';

import {
  CreateSpecialtyUseCase,
  DeleteSpecialtyUseCase,
  FilterByPropertiesUseCase,
  FindAllSpecialtiesUseCase,
  FindByNameUseCase,
  UpdateSpecialtyUseCase,
} from '@specialties/use-cases';

@ApiTags('specialties')
@Controller('specialty')
export class SpecialtiesController {
  constructor(
    private createSpecialtyUseCase: CreateSpecialtyUseCase,
    private deleteSpecialtyUseCase: DeleteSpecialtyUseCase,
    private updateSpecialtyUseCase: UpdateSpecialtyUseCase,
    private findAllSpecialtiesUseCase: FindAllSpecialtiesUseCase,
    private filterByPropertiesSpecialtyUseCase: FilterByPropertiesUseCase,
    private findByNameSpecialtyUseCase: FindByNameUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Especialidade cadastrada com sucesso!',
    schema: {
      $ref: getSchemaPath(FilterByPropertiesSpecialtyDTO),
    },
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Não foi possível cadastrar a especialidade!',
  })
  create(@Body() { name }: CreateSpecialtyDTO): Promise<Specialty> {
    return this.createSpecialtyUseCase.execute({ name });
  }

  @Get('/all')
  @ApiExtraModels(FilterByPropertiesSpecialtyDTO)
  @ApiOkResponse({
    status: HttpStatus.OK,
    schema: {
      $ref: getSchemaPath(FilterByPropertiesSpecialtyDTO),
    },
  })
  findAll(): Promise<Specialty[]> {
    return this.findAllSpecialtiesUseCase.execute();
  }

  @Get('/filter')
  @ApiOkResponse({
    status: HttpStatus.OK,
    schema: {
      $ref: getSchemaPath(FilterByPropertiesSpecialtyDTO),
    },
  })
  filterByProperties(
    @Query() properties: FilterByPropertiesSpecialtyDTO,
  ): Promise<Specialty[]> {
    return this.filterByPropertiesSpecialtyUseCase.execute(properties);
  }

  @Get(':name')
  @ApiOkResponse({
    status: HttpStatus.OK,
    schema: {
      $ref: getSchemaPath(FilterByPropertiesSpecialtyDTO),
    },
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Não foi possível encontrar a especialidade!',
  })
  findByName(@Param('name') name: string): Promise<Specialty> {
    return this.findByNameSpecialtyUseCase.execute(name);
  }

  @Put()
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Especialidade alterada com sucesso!',
    schema: {
      $ref: getSchemaPath(FilterByPropertiesSpecialtyDTO),
    },
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Não foi possível alterar a especialidade!',
  })
  update(@Body() { name, newName }: UpdateSpecialtyDTO): Promise<Specialty> {
    return this.updateSpecialtyUseCase.execute({ name, newName });
  }

  @Delete(':name')
  @ApiNoContentResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Especialidade deletada com sucesso!',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Não foi possível deletar a especialidade!',
  })
  @HttpCode(204)
  delete(@Param('name') name: string): Promise<void> {
    return this.deleteSpecialtyUseCase.execute(name);
  }
}
