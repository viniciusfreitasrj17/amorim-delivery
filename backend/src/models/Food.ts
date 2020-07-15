import { Entity, Column, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsBoolean } from 'class-validator';
import Global from './Global';
import Category from './Category';

@Entity('foods')
export default class Food extends Global {
  @Column()
  @IsNotEmpty({ message: 'Preencha este campo' })
  name: string;

  @Column({ default: true })
  @IsBoolean()
  stock: boolean;

  @Column()
  @IsNotEmpty({ message: 'Preencha este campo' })
  price: string;

  @ManyToOne(type => Category, foods => Food, { eager: true })
  category: Category;
}
