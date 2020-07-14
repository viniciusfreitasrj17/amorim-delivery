import { Entity, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import Global from './Global';

@Entity('categories')
export default class Category extends Global {
  @Column({ unique: true })
  @IsNotEmpty({ message: 'Preencha esta campo' })
  name: string;
}
