import { Entity, Column } from 'typeorm';
import Global from './Global';

@Entity('clients')
export default class Client extends Global {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  street: string;

  @Column()
  address: string;

  @Column()
  number: string;
}
