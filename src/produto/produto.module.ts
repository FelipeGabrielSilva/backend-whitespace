import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { PrismaService } from 'src/prisma.service';
import { MovimentacaoEstoqueService } from 'src/movimentacao_estoque/movimentacao_estoque.service';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoService, PrismaService, MovimentacaoEstoqueService],
})
export class ProdutoModule {}
