import { Entity, Column, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import Global from './Global';
import Food from './Food';

@Entity('categories')
export default class Category extends Global {
  @Column({ unique: true })
  @IsNotEmpty({ message: 'Preencha este campo' })
  name: string;

  @OneToMany(type => Food, category => Category)
  foods: Food[];
}
