import { Module } from '@nestjs/common';
import { MProdutoPedidoService } from './m_produto_pedido.service';
import { MProdutoPedidoController } from './m_produto_pedido.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MProdutoPedidoController],
  providers: [MProdutoPedidoService, PrismaService],
})
export class MProdutoPedidoModule {}
