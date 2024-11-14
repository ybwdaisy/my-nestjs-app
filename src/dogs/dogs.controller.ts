import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UsePipes,
  InternalServerErrorException,
} from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto, createDogSchema } from './dto/create-dog.dto';
import { UpdateDogDto, updateDogSchema } from './dto/update-dog.dto';
import { Dog } from './interfaces/dog.interface';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createDogSchema))
  async create(@Body() createDogDto: CreateDogDto): Promise<Dog> {
    try {
      return await this.dogsService.create(createDogDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  async findAll(): Promise<Dog[] | null> {
    try {
      return await this.dogsService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Dog | null> {
    try {
      return await this.dogsService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateDogSchema)) updateDogDto: UpdateDogDto,
  ): Promise<null> {
    try {
      return await this.dogsService.update(id, updateDogDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<null> {
    try {
      return this.dogsService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
