import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateMProdutoPedidoDto {
  
  @IsNumber()
  @IsNotEmpty()
  quantidade: number;
  
  @IsNumber()
  @IsNotEmpty()
  produtoId: number;
  
  @IsNumber()
  @IsNotEmpty()
  pedidoId: number;
  
  @IsNumber()
  @IsNotEmpty()
  valorTotal: number;
}
