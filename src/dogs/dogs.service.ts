import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Dog } from './entities/dog.entity';

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(Dog)
    private dogsRepository: Repository<Dog>,
  ) {}

  create(createDogDto: CreateDogDto) {
    return this.dogsRepository.save(createDogDto);
  }

  findAll() {
    return this.dogsRepository.find();
  }

  findOne(id: number) {
    return this.dogsRepository.findOneBy({ id });
  }

  async update(id: number, updateDogDto: UpdateDogDto) {
    await this.dogsRepository.update(id, updateDogDto);
    return null;
  }

  async remove(id: number) {
    await this.dogsRepository.delete(id);
    return null;
  }
}
