import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Supplier } from '../suppliers/supplier.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column('float')
  price: number;

  @Column({ unique: true })
  barcode: string;

  @ManyToMany(() => Supplier, (supplier) => supplier.products)
  @JoinTable({
    name: 'product_suppliers',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'supplier_id', referencedColumnName: 'id' },
  })
  suppliers: Supplier[];
}
