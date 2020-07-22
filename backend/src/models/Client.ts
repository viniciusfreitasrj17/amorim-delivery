/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/camelcase */
import { Entity, Column, OneToMany } from 'typeorm';
import {
  IsEmail,
  MinLength,
  IsNotEmpty,
  IsAlphanumeric,
  IsNumber
} from 'class-validator';
import Global from './Global';
import Demand from './Demand';

@Entity('clients')
export default class Client extends Global {
  @Column()
  @IsNotEmpty({ message: 'Preencha este campo' })
  name: string;

  @Column({ unique: true })
  @IsEmail(
    { allow_display_name: false },
    { message: 'Digite um e-mail válido' }
  )
  @IsNotEmpty({ message: 'Preencha este campo' })
  email: string;

  @Column({ select: false })
  @IsNotEmpty({ message: 'Preencha este campo' })
  @IsAlphanumeric('pt-BR', {
    message: 'A senha deve conter letras e/ou números'
  })
  @MinLength(8, { message: 'A senha deve possui no mínimo 8 caracteres' })
  password: string;

  @Column({ select: false, nullable: true })
  passwordResetToken: string;

  @Column({ select: false, nullable: true })
  passwordResetExpires: Date;

  @Column()
  @IsNotEmpty({ message: 'Preencha este campo' })
  street: string;

  @Column()
  @IsNotEmpty({ message: 'Preencha este campo' })
  address: string;

  @Column()
  @IsNumber()
  @IsNotEmpty({ message: 'Preencha este campo' })
  number: number;

  // Array List Demands
  @Column('text', { array: true, default: {} })
  demands: string[];

  // Foreign Key from Relation Demand Client
  @OneToMany(type => Demand, client => Client)
  demand: Demand[];
}
