import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly suppliersRepository: Repository<Supplier>,
  ) {}

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const supplier = this.suppliersRepository.create(createSupplierDto);
    return this.suppliersRepository.save(supplier);
  }

  async findAll(): Promise<Supplier[]> {
    return this.suppliersRepository.find({
      relations: {
        products: true,
      },
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Supplier> {
    const supplier = await this.suppliersRepository.findOne({
      where: { id },
      relations: {
        products: true,
      },
    });

    if (!supplier) {
      throw new NotFoundException(`Fornecedor ${id} nao encontrado.`);
    }

    return supplier;
  }

  async update(
    id: number,
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<Supplier> {
    const supplier = await this.findOne(id);
    Object.assign(supplier, updateSupplierDto);
    return this.suppliersRepository.save(supplier);
  }

  async remove(id: number): Promise<{ message: string }> {
    const supplier = await this.findOne(id);
    supplier.products = [];
    await this.suppliersRepository.save(supplier);
    await this.suppliersRepository.remove(supplier);

    return { message: `Fornecedor ${id} removido com sucesso.` };
  }
}
