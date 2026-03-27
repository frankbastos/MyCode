import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ManageProductSupplierDto } from './dto/manage-product-supplier.dto';
import { ProductSuppliersService } from './product-suppliers.service';

@Controller('produto-fornecedores')
export class ProductSuppliersController {
  constructor(
    private readonly productSuppliersService: ProductSuppliersService,
  ) {}

  @Post()
  associate(@Body() manageProductSupplierDto: ManageProductSupplierDto) {
    return this.productSuppliersService.associate(
      manageProductSupplierDto.produtoId,
      manageProductSupplierDto.fornecedorId,
    );
  }

  @Delete(':produtoId/:fornecedorId')
  removeAssociation(
    @Param('produtoId', ParseIntPipe) produtoId: number,
    @Param('fornecedorId', ParseIntPipe) fornecedorId: number,
  ) {
    return this.productSuppliersService.removeAssociation(produtoId, fornecedorId);
  }

  @Get('produtos/:produtoId/fornecedores')
  findSuppliersByProduct(@Param('produtoId', ParseIntPipe) produtoId: number) {
    return this.productSuppliersService.findSuppliersByProduct(produtoId);
  }

  @Get('fornecedores/:fornecedorId/produtos')
  findProductsBySupplier(
    @Param('fornecedorId', ParseIntPipe) fornecedorId: number,
  ) {
    return this.productSuppliersService.findProductsBySupplier(fornecedorId);
  }
}
