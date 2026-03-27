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

  async associate(produtoId: number, fornecedorId: number): Promise<Product> {
    const product = await this.findProduct(produtoId);
    const supplier = await this.findSupplier(fornecedorId);

    const alreadyAssociated = product.fornecedores.some(
      (item) => item.id === supplier.id,
    );

    if (!alreadyAssociated) {
      product.fornecedores.push(supplier);
      await this.productsRepository.save(product);
    }

    return this.findProduct(produtoId);
  }

  async removeAssociation(
    produtoId: number,
    fornecedorId: number,
  ): Promise<{ message: string }> {
    const product = await this.findProduct(produtoId);
    const hasAssociation = product.fornecedores.some(
      (supplier) => supplier.id === fornecedorId,
    );

    if (!hasAssociation) {
      throw new NotFoundException(
        `Associação entre produto ${produtoId} e fornecedor ${fornecedorId} não encontrada.`,
      );
    }

    product.fornecedores = product.fornecedores.filter(
      (supplier) => supplier.id !== fornecedorId,
    );
    await this.productsRepository.save(product);

    return {
      message: `Associação entre produto ${produtoId} e fornecedor ${fornecedorId} removida com sucesso.`,
    };
  }

  async findSuppliersByProduct(produtoId: number): Promise<Supplier[]> {
    const product = await this.findProduct(produtoId);
    return product.fornecedores;
  }

  async findProductsBySupplier(fornecedorId: number): Promise<Product[]> {
    const supplier = await this.findSupplier(fornecedorId);
    return supplier.produtos;
  }

  private async findProduct(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: {
        fornecedores: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Produto ${id} não encontrado.`);
    }

    if (!product.fornecedores) {
      product.fornecedores = [];
    }

    return product;
  }

  private async findSupplier(id: number): Promise<Supplier> {
    const supplier = await this.suppliersRepository.findOne({
      where: { id },
      relations: {
        produtos: true,
      },
    });

    if (!supplier) {
      throw new NotFoundException(`Fornecedor ${id} não encontrado.`);
    }

    if (!supplier.produtos) {
      supplier.produtos = [];
    }

    return supplier;
  }
}
