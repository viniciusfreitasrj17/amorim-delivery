/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column } from 'typeorm';
import { IsNotEmpty, IsArray } from 'class-validator';
import Global from './Global';

@Entity('promos')
export default class Promo extends Global {
  @Column()
  @IsNotEmpty({ message: 'Preencha este campo' })
  name: string;

  @Column()
  @IsNotEmpty({ message: 'Preencha este campo' })
  image: string;

  @Column()
  @IsNotEmpty({ message: 'Preencha este campo' })
  total: number;

  @Column('text', { array: true })
  @IsArray()
  foods: string[];
}
