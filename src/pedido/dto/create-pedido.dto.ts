import { Type } from 'class-transformer';
import { ArrayMinSize, IsNumber, ValidateNested } from 'class-validator';
import { CreateItemPedidoDto } from 'src/item_pedido/dto/create-item_pedido.dto';

export class CreatePedidoDto {
  @IsNumber()
  clienteId: number;

  @ValidateNested({ each: true })
  @ArrayMinSize(1) 
  @Type(() => CreateItemPedidoDto)
  produtos: CreateItemPedidoDto[];
}