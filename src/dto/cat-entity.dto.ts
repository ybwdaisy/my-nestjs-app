import { UpdateCatDto } from './update-cat.dto';

export class ListAllEntities {
  limit: number;
  total: number;
  list: UpdateCatDto[];
}
