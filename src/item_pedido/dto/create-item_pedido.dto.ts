import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateItemPedidoDto {
  @IsNumber()
  @IsNotEmpty()
  quantidade: number;

  @IsNumber()
  @IsNotEmpty()
  produtoId: number;

  @IsNumber()
  @IsNotEmpty()
  valorTotal: number;
}
