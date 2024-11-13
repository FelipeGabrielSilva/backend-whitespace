import { pedido_status } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdatePedidoDto {
  @IsEnum(pedido_status)
  status: pedido_status;
}
