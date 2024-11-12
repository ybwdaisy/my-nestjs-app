import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateSubjectsDto,
  SubjectsFindOneParams,
  SubjectsListQuery,
} from './subjects.dto';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {}

  @Get()
  async findAll(@Query() query: SubjectsListQuery) {
    console.log('DEVLOG / SubjectsController / findAll / query:', query);
    const data = await this.subjectsService.findAll();
    return {
      status: 0,
      message: 'success',
      data,
    };
  }

  @Get(':id')
  async findOne(@Param() params: SubjectsFindOneParams) {
    const data = await this.subjectsService.findOne(params.id);
    return {
      status: 0,
      message: 'success',
      data,
    };
  }

  @Post()
  async create(@Body() createSubjectsDto: CreateSubjectsDto) {
    const { id } = await this.subjectsService.create(createSubjectsDto);
    return {
      status: 0,
      message: 'success',
      data: {
        id,
      },
    };
  }

  @Delete(':id')
  async remove(@Param() params: SubjectsFindOneParams) {
    await this.subjectsService.remove(params.id);
    return {
      status: 0,
      message: 'success',
      data: null,
    };
  }
}
