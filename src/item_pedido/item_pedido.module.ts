import { Module } from '@nestjs/common';
import { ItemProdutoController } from './item_pedido.controller';
import { PrismaService } from 'src/prisma.service';
import { ItemPedidoService } from './item_pedido.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ItemProdutoController],
  providers: [JwtService,ItemPedidoService, PrismaService],
})
export class MProdutoPedidoModule {}
