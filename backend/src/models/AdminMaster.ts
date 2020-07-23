/* eslint-disable @typescript-eslint/camelcase */
import { Entity, Column } from 'typeorm';
import {
  IsEmail,
  MinLength,
  IsNotEmpty,
  IsAlphanumeric
} from 'class-validator';
import Global from './Global';

@Entity('admins')
export default class Admin extends Global {
  @Column()
  @IsNotEmpty({ message: 'Preencha este campo' })
  name: string;

  @Column({ default: false })
  master: boolean;

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
}
