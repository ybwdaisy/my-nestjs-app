import { IsNumberString } from 'class-validator';

export class SubjectsListQuery {
  @IsNumberString()
  limit: number;
}

export class SubjectsFindOneParams {
  @IsNumberString()
  id: number;
}

export class CreateSubjectsDto {
  name: string;
  slogan: string;
}
