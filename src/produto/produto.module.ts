import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';
import { JwtService } from '@nestjs/jwt';
import { FornecedorService } from 'src/fornecedor/fornecedor.service';

@Module({
  controllers: [ProdutoController],
  providers: [JwtService ,ProdutoService, PrismaService, FornecedorService],
})
export class ProdutoModule {}
