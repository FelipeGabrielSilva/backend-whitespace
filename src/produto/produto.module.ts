import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { PrismaService } from 'src/prisma.service';
import { MovimentacaoEstoqueService } from 'src/movimentacao_estoque/movimentacao_estoque.service';
import { FornecedorService } from 'src/fornecedor/fornecedor.service';
import { ProdutoFornecedorService } from 'src/produto_fornecedor/produto_fornecedor.service';

@Module({
  controllers: [ProdutoController],
  providers: [
    ProdutoService,
    PrismaService,
    MovimentacaoEstoqueService,
    FornecedorService,
    ProdutoFornecedorService,
  ],
})
export class ProdutoModule {}
