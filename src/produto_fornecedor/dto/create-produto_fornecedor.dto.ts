import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProdutoFornecedorDto {
  @IsNumber()
  @IsNotEmpty()
  produtoId: number;

  @IsNumber()
  @IsNotEmpty()
  fornecedorId: number;

  @IsNumber()
  @IsNotEmpty()
  precoCompra: number;

  @IsNumber()
  @IsNotEmpty()
  criadorId: number;
}
