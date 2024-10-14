import { Module } from '@nestjs/common';
import { MovimentacaoEstoqueService } from './movimentacao_estoque.service';
import { MovimentacaoEstoqueController } from './movimentacao_estoque.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MovimentacaoEstoqueController],
  providers: [MovimentacaoEstoqueService, PrismaService],
})
export class MovimentacaoEstoqueModule {}
