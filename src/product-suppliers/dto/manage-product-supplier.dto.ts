import { IsInt, IsPositive } from 'class-validator';

export class ManageProductSupplierDto {
  @IsInt()
  @IsPositive()
  produtoId: number;

  @IsInt()
  @IsPositive()
  fornecedorId: number;
}
