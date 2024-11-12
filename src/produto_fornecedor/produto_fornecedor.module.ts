import { Module } from '@nestjs/common';
import { ProdutoFornecedorService } from './produto_fornecedor.service';
import { ProdutoFornecedorController } from './produto_fornecedor.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProdutoFornecedorController],
  providers: [JwtService,ProdutoFornecedorService, PrismaService],
})
export class ProdutoFornecedorModule {}
