import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subjects } from './subjects.entity';
import { CreateSubjectsDto } from './subjects.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subjects)
    private subjectsRepository: Repository<Subjects>,
  ) {}

  async findAll(): Promise<Subjects[]> {
    return this.subjectsRepository.find();
  }

  async findOne(id: number): Promise<Subjects | null> {
    return this.subjectsRepository.findOneBy({ id });
  }

  async create(createSubjectsDto: CreateSubjectsDto): Promise<Subjects> {
    const subjects = new Subjects();
    subjects.subject_name = createSubjectsDto.name;
    subjects.slogan = createSubjectsDto.slogan;
    const now = new Date();
    subjects.create_time = `${now.toDateString()} ${now.toTimeString()}`;
    return this.subjectsRepository.save(subjects);
  }

  async remove(id: number): Promise<void> {
    await this.subjectsRepository.delete(id);
  }
}
