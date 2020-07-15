import { Entity, Column } from 'typeorm';
import { IsArray } from 'class-validator';
import Global from './Global';

@Entity('demands')
export default class Demand extends Global {
  @Column()
  total: number;

  @Column('text', { array: true })
  @IsArray()
  foods: string[];
}
