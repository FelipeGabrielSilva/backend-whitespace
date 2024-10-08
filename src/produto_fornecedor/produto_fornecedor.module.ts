import { Module } from '@nestjs/common';
import { ProdutoFornecedorService } from './produto_fornecedor.service';
import { ProdutoFornecedorController } from './produto_fornecedor.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProdutoFornecedorController],
  providers: [ProdutoFornecedorService, PrismaService],
})
export class ProdutoFornecedorModule {}
