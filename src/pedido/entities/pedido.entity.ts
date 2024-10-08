import { StatusPedido } from '@prisma/client';
import { Cliente } from 'src/cliente/entities/cliente.entity';

export class Pedido {
  id: number;
  dataPedido: Date;
  clienteId: number;
  status: StatusPedido;
  cliente: Cliente;
}
