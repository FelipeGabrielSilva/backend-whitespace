import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProdutoFornecedorDto } from './dto/create-produto_fornecedor.dto';
import { UpdateProdutoFornecedorDto } from './dto/update-produto_fornecedor.dto';

@Injectable()
export class ProdutoFornecedorService {
  constructor(private prisma: PrismaService) {}

  criarProdutoFornecedor = async (createDto: CreateProdutoFornecedorDto) => {
    const { produtoId, fornecedorId, precoCompra, criadorId } = createDto;

    const novoProdutoFornecedor = await this.prisma.produtofornecedor.create({
      data: {
        produtoId,
        fornecedorId,
        precoCompra,
        criadorId,
      },
    });

    return novoProdutoFornecedor;
  };

  procurarTodos = async () => {
    return await this.prisma.produtofornecedor.findMany({
      include: {
        produto: true,
        fornecedor: true,
      },
    });
  };

  procurarUm = async (id: number) => {
    const produtoFornecedor = await this.prisma.produtofornecedor.findUnique({
      where: { id },
      include: {
        produto: true,
        fornecedor: true,
      },
    });

    if (!produtoFornecedor) {
      throw new NotFoundException('ProdutoFornecedor não encontrado');
    }

    return produtoFornecedor;
  };

  update = async (id: number, updateDto: UpdateProdutoFornecedorDto) => {
    const produtoFornecedor = await this.prisma.produtofornecedor.findUnique({
      where: { id },
    });

    if (!produtoFornecedor) {
      throw new NotFoundException('ProdutoFornecedor não encontrado');
    }

    return await this.prisma.produtofornecedor.update({
      where: { id },
      data: updateDto,
    });
  };

  remove = async (id: number) => {
    const produtoFornecedor = await this.prisma.produtofornecedor.findUnique({
      where: { id },
    });

    if (!produtoFornecedor) {
      throw new NotFoundException('ProdutoFornecedor não encontrado');
    }

    await this.prisma.produtofornecedor.delete({
      where: { id },
    });

    return `ProdutoFornecedor com ID ${id} removido com sucesso.`;
  };
}
