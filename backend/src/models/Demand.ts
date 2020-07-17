/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsArray } from 'class-validator';
import Global from './Global';
import Client from './Client';

@Entity('demands')
export default class Demand extends Global {
  @Column()
  total: number;

  @Column('text', { array: true })
  @IsArray()
  foods: string[];

  @ManyToOne(type => Client, { eager: true })
  @JoinColumn()
  client: Client;
}
