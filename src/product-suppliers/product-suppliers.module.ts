import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/product.entity';
import { Supplier } from '../suppliers/supplier.entity';
import { ProductSuppliersController } from './product-suppliers.controller';
import { ProductSuppliersService } from './product-suppliers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Supplier])],
  controllers: [ProductSuppliersController],
  providers: [ProductSuppliersService],
})
export class ProductSupplierModule {}
