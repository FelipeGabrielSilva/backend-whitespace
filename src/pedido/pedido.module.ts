import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { PrismaService } from 'src/prisma.service';
import { ItemPedidoService } from 'src/item_pedido/item_pedido.service';
import { MovimentacaoEstoqueService } from 'src/movimentacao_estoque/movimentacao_estoque.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PedidoController],
  providers: [
    JwtService,
    PedidoService,
    PrismaService,
    ItemPedidoService,
    MovimentacaoEstoqueService,
  ],
})
export class PedidoModule {}
