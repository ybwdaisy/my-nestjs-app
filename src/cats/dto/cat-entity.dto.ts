import { IsNumberString } from 'class-validator';
import { UpdateCatDto } from './update-cat.dto';

export class ListAllEntities {
  @IsNumberString()
  limit: number;
  total: number;
  list: UpdateCatDto[];
}

export class FindOneParams {
  @IsNumberString()
  id: number;
}
