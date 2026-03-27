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

@Controller('product-suppliers')
export class ProductSuppliersController {
  constructor(
    private readonly productSuppliersService: ProductSuppliersService,
  ) {}

  @Post()
  associate(@Body() manageProductSupplierDto: ManageProductSupplierDto) {
    return this.productSuppliersService.associate(
      manageProductSupplierDto.productId,
      manageProductSupplierDto.supplierId,
    );
  }

  @Delete(':productId/:supplierId')
  removeAssociation(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('supplierId', ParseIntPipe) supplierId: number,
  ) {
    return this.productSuppliersService.removeAssociation(productId, supplierId);
  }

  @Get('products/:productId/suppliers')
  findSuppliersByProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productSuppliersService.findSuppliersByProduct(productId);
  }

  @Get('suppliers/:supplierId/products')
  findProductsBySupplier(
    @Param('supplierId', ParseIntPipe) supplierId: number,
  ) {
    return this.productSuppliersService.findProductsBySupplier(supplierId);
  }
}
