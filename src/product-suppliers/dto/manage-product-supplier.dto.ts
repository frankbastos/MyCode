import { IsInt, IsPositive } from 'class-validator';

export class ManageProductSupplierDto {
  @IsInt()
  @IsPositive()
  productId: number;

  @IsInt()
  @IsPositive()
  supplierId: number;
}
