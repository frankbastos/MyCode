import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../products/product.entity';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  cnpj: string;

  @Column()
  address: string;

  @Column()
  contact: string;

  @ManyToMany(() => Product, (product) => product.suppliers)
  products: Product[];
}
