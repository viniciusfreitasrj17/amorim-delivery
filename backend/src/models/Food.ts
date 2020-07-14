import { Entity, Column } from 'typeorm';
import { IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import Global from './Global';

@Entity('foods')
export default class Food extends Global {
  @Column()
  @IsNotEmpty({ message: 'Preencha esta campo' })
  name: string;

  @Column({ default: true })
  @IsBoolean()
  stock: boolean;

  @Column()
  @IsNumber()
  @IsNotEmpty({ message: 'Preencha esta campo' })
  price: number;

  @Column()
  @IsNotEmpty({ message: 'Preencha esta campo' })
  category: number;
}
