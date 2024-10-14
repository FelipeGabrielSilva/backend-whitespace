import { Cliente, ItemPedido, StatusPedido } from "@prisma/client";

export class Pedido {
    id: number;
    dataPedido: Date;
    clienteId: number;
    status: StatusPedido;
    cliente: Cliente;
    produtos: ItemPedido[];
  }