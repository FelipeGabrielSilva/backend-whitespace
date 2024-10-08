import { StatusPedido } from '@prisma/client';

export class CreatePedidoDto {
  clienteId: number;
  status: StatusPedido;
}
