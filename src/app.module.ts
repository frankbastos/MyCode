import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSupplierModule } from './product-suppliers/product-suppliers.module';
import { Product } from './products/product.entity';
import { ProductsModule } from './products/products.module';
import { Supplier } from './suppliers/supplier.entity';
import { SuppliersModule } from './suppliers/suppliers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Product, Supplier],
      synchronize: true,
    }),
    ProductsModule,
    SuppliersModule,
    ProductSupplierModule,
  ],
})
export class AppModule {}
