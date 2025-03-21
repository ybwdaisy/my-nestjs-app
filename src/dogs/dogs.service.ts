import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createDogDto: CreateDogDto): Promise<Dog> {
    const dog = this.dogsRepository.create(createDogDto);
    return await this.dogsRepository.save(dog);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ items: Dog[]; total: number }> {
    const [items, total] = await this.dogsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createTime: 'DESC',
      },
    });

    return {
      items,
      total,
    };
  }

  async findOne(id: number): Promise<Dog> {
    const dog = await this.dogsRepository.findOneBy({ id });
    if (!dog) {
      throw new NotFoundException(`Dog with ID ${id} not found`);
    }
    return dog;
  }

  async update(id: number, updateDogDto: UpdateDogDto): Promise<Dog> {
    const dog = await this.findOne(id);
    Object.assign(dog, updateDogDto);
    return await this.dogsRepository.save(dog);
  }

  async remove(id: number): Promise<Dog> {
    const dog = await this.findOne(id);
    await this.dogsRepository.remove(dog);
    return dog;
  }
}
