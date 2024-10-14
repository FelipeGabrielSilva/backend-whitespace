import { Module } from '@nestjs/common';
import { ItemProdutoController } from './item_pedido.controller';
import { PrismaService } from 'src/prisma.service';
import { ItemPedidoService } from './item_pedido.service';

@Module({
  controllers: [ItemProdutoController],
  providers: [ItemPedidoService, PrismaService],
})
export class MProdutoPedidoModule {}
