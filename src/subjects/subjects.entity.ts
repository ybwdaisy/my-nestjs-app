import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subjects')
export class Subjects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  subject_type: number;

  @Column()
  subject_name: string;

  @Column()
  slogan: string;

  @Column({ default: '' })
  img_url: string;

  @Column({ default: 0 })
  online: number;

  @Column()
  create_time: string;
}
