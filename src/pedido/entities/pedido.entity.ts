import { cliente, itempedido, pedido_status } from "@prisma/client";

export class Pedido {
    id: number;
    dataPedido: Date;
    clienteId: number;
    status: pedido_status;
    cliente: cliente;
    produtos: itempedido[];
  }