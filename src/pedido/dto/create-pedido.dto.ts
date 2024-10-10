import { StatusPedido } from '@prisma/client';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePedidoDto {
  @IsNumber()
  @IsNotEmpty()
  clienteId: number;
  status: StatusPedido;
}
