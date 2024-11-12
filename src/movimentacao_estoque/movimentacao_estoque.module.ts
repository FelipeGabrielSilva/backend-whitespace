import { Module } from '@nestjs/common';
import { MovimentacaoEstoqueService } from './movimentacao_estoque.service';
import { MovimentacaoEstoqueController } from './movimentacao_estoque.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [MovimentacaoEstoqueController],
  providers: [JwtService,MovimentacaoEstoqueService, PrismaService],
})
export class MovimentacaoEstoqueModule {}
