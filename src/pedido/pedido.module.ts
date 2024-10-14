import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { PrismaService } from 'src/prisma.service';
import { ItemPedidoService } from 'src/item_pedido/item_pedido.service';
import { MovimentacaoEstoqueService } from 'src/movimentacao_estoque/movimentacao_estoque.service';

@Module({
  controllers: [PedidoController],
  providers: [
    PedidoService,
    PrismaService,
    ItemPedidoService,
    MovimentacaoEstoqueService,
  ],
})
export class PedidoModule {}
