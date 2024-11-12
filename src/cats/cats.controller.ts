import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  Query,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  CreateCatDto,
  FindOneParams,
  ListAllEntities,
  UpdateCatDto,
} from './dto';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Query() query: ListAllEntities, @Res() res: Response) {
    res.status(HttpStatus.OK).json({
      status: 0,
      message: `This action returns all cats (limit: ${query.limit} items)`,
      data: null,
    });
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): string {
    return `This action returns a #${params.id} cat`;
  }

  @Post()
  create(@Body() creatCatDto: CreateCatDto) {
    console.log('DEVLOG / CatsController / create / creatCatDto:', creatCatDto);
    return 'This action adds a new cat';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    console.log(
      'DEVLOG / CatsController / update / updateCatDto:',
      updateCatDto,
    );
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
