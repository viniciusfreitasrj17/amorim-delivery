import { Entity, Column } from 'typeorm';
import { IsNotEmpty, IsDateString } from 'class-validator';
import Global from './Global';

@Entity('demands')
export default class Demand extends Global {
  @Column()
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @Column()
  total: number;
}
