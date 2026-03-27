import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../products/product.entity';

@Entity('fornecedores')
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  cnpj: string;

  @Column()
  endereco: string;

  @Column()
  contato: string;

  @ManyToMany(() => Product, (produto) => produto.fornecedores)
  produtos: Product[];
}
