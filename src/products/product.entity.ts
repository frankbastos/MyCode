import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Supplier } from '../suppliers/supplier.entity';

@Entity('produtos')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ nullable: true })
  descricao?: string;

  @Column('float')
  preco: number;

  @Column({ unique: true })
  codigoBarras: string;

  @ManyToMany(() => Supplier, (fornecedor) => fornecedor.produtos)
  @JoinTable({
    name: 'produto_fornecedores',
    joinColumn: { name: 'produto_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'fornecedor_id', referencedColumnName: 'id' },
  })
  fornecedores: Supplier[];
}
