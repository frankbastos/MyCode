import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';
import { Supplier } from '../suppliers/supplier.entity';

@Injectable()
export class ProductSuppliersService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Supplier)
    private readonly suppliersRepository: Repository<Supplier>,
  ) {}

  async associate(productId: number, supplierId: number): Promise<Product> {
    const product = await this.findProduct(productId);
    const supplier = await this.findSupplier(supplierId);

    const alreadyAssociated = product.suppliers.some(
      (item) => item.id === supplier.id,
    );

    if (!alreadyAssociated) {
      product.suppliers.push(supplier);
      await this.productsRepository.save(product);
    }

    return this.findProduct(productId);
  }

  async removeAssociation(
    productId: number,
    supplierId: number,
  ): Promise<{ message: string }> {
    const product = await this.findProduct(productId);
    const hasAssociation = product.suppliers.some(
      (supplier) => supplier.id === supplierId,
    );

    if (!hasAssociation) {
      throw new NotFoundException(
        `Associacao entre produto ${productId} e fornecedor ${supplierId} nao encontrada.`,
      );
    }

    product.suppliers = product.suppliers.filter(
      (supplier) => supplier.id !== supplierId,
    );
    await this.productsRepository.save(product);

    return {
      message: `Associacao entre produto ${productId} e fornecedor ${supplierId} removida com sucesso.`,
    };
  }

  async findSuppliersByProduct(productId: number): Promise<Supplier[]> {
    const product = await this.findProduct(productId);
    return product.suppliers;
  }

  async findProductsBySupplier(supplierId: number): Promise<Product[]> {
    const supplier = await this.findSupplier(supplierId);
    return supplier.products;
  }

  private async findProduct(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: {
        suppliers: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Produto ${id} nao encontrado.`);
    }

    if (!product.suppliers) {
      product.suppliers = [];
    }

    return product;
  }

  private async findSupplier(id: number): Promise<Supplier> {
    const supplier = await this.suppliersRepository.findOne({
      where: { id },
      relations: {
        products: true,
      },
    });

    if (!supplier) {
      throw new NotFoundException(`Fornecedor ${id} nao encontrado.`);
    }

    if (!supplier.products) {
      supplier.products = [];
    }

    return supplier;
  }
}
