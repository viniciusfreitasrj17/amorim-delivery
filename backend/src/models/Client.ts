import { Entity, Column } from 'typeorm';
import {
  IsEmail,
  MinLength,
  IsNotEmpty,
  IsAlphanumeric,
  IsNumber
} from 'class-validator';
import Global from './Global';

@Entity('clients')
export default class Client extends Global {
  @Column()
  @IsNotEmpty({ message: 'Preencha esta campo' })
  name: string;

  @Column({ unique: true })
  @IsEmail(
    { allow_display_name: false },
    { message: 'Digite um e-mail válido' }
  )
  @IsNotEmpty({ message: 'Preencha esta campo' })
  email: string;

  @Column()
  @IsNotEmpty({ message: 'Preencha esta campo' })
  @IsAlphanumeric('pt-BR', {
    message: 'A senha deve conter letras e/ou números'
  })
  @MinLength(8, { message: 'A senha deve possui no mínimo 8 caracteres' })
  password: string;

  @Column()
  @IsNotEmpty({ message: 'Preencha esta campo' })
  street: string;

  @Column()
  @IsNotEmpty({ message: 'Preencha esta campo' })
  address: string;

  @Column()
  @IsNumber()
  @IsNotEmpty({ message: 'Preencha esta campo' })
  number: number;
}
