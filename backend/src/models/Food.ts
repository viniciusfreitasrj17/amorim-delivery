import { Entity, Column } from 'typeorm';
import { IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import Global from './Global';

@Entity('foods')
export default class Food extends Global {
  @Column()
  @IsNotEmpty({ message: 'Preencha este campo' })
  name: string;

  @Column({ default: true })
  @IsBoolean()
  stock: boolean;

  @Column()
  @IsNumber()
  @IsNotEmpty({ message: 'Preencha este campo' })
  price: number;

  @Column()
  @IsNotEmpty({ message: 'Preencha este campo' })
  category: number;
}
