import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsNumber()
  @IsNotEmpty()
  medidaId: number;

  @IsNumber()
  @IsNotEmpty()
  precoCompra: number;

  @IsNumber()
  @IsNotEmpty()
  valorUn: number;

  @IsNumber()
  @IsNotEmpty()
  categoriaId: number;

  @IsNumber()
  @IsNotEmpty()
  quantidade: number;

  @IsNumber()
  @IsNotEmpty()
  criadorId: number;

  @IsNumber()
  fornecedorId?: number;
}
