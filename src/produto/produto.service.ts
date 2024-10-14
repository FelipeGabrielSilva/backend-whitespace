import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { CreateMovimentacaoEstoqueDto } from 'src/movimentacao_estoque/dto/create-movimentacao_estoque.dto';

@Injectable()
export class ProdutoService {
  constructor(private readonly prisma: PrismaService) {}

  criarProduto = async (createProdutoDto: CreateProdutoDto) => {
    try {
      const {
        descricao,
        unMedida,
        valorUn,
        categoriaId,
        criadorId,
        quantidade,
      } = createProdutoDto;

      const novoProduto = await this.prisma.produto.create({
        data: {
          descricao,
          unMedida,
          valorUn,
          categoriaId,
          criadorId,
          quantidade,
        },
      });

      if (quantidade > 0) {
        await this.adicionarMovimentacao(novoProduto.id, {
          produtoId: novoProduto.id,
          tipo: 'ENTRADA',
          quantidade: quantidade,
          observacao: 'Entrada inicial do produto',
          criadorId: 1,
        });
      }

      return novoProduto;
    } catch (error) {}
  };

  procurarTodos = async () => {
    return await this.prisma.produto.findMany({
      include: {
        categoria: true,
      },
    });
  };

  procurarUm = async (id: number) => {
    try {
      const encontrado = await this.prisma.produto.findUnique({
        where: { id: id },
      });

      if (encontrado) {
        return {
          message: 'Produto encontrado!',
          encontrado,
        };
      } else {
        throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
      }
    } catch (error) {
      throw new Error(`Erro ao procurar produto: ${error.message}`);
    }
  };

  update = async (id: number, updateProdutoDto: UpdateProdutoDto) => {
    try {
      const encontrado = await this.prisma.produto.findUnique({
        where: { id: id },
      });

      if (!encontrado) {
        throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
      }

      const produtoAtualizado = await this.prisma.produto.update({
        where: { id: encontrado.id },
        data: updateProdutoDto,
      });

      return produtoAtualizado;
    } catch (error) {
      throw new Error(`Erro ao atualizar produto: ${error.message}`);
    }
  };

  remove = async (id: number) => {
    try {
      await this.prisma.produto.delete({ where: { id: id } });

      return `Produto com ID ${id} removido com sucesso.`;
    } catch (error) {
      throw new Error(`Erro ao deletar produto: ${error.message}`);
    }
  };

  adicionarMovimentacao = async (
    produtoId: number,
    movimentacaoDto: CreateMovimentacaoEstoqueDto,
  ) => {
    try {
      const produto = await this.prisma.produto.findUnique({
        where: { id: produtoId },
      });

      if (!produto) {
        throw new NotFoundException(
          `Produto com ID ${produtoId} não encontrado.`,
        );
      }

      const novaMovimentacao = await this.prisma.movimentacaoEstoque.create({
        data: {
          tipo: movimentacaoDto.tipo,
          quantidade: movimentacaoDto.quantidade,
          observacao: movimentacaoDto.observacao,
          criadorId: movimentacaoDto.criadorId,
          produto: { connect: { id: produtoId } },
        },
      });

      return novaMovimentacao;
    } catch (error) {
      throw new Error(`Erro ao adicionar movimentação: ${error.message}`);
    }
  };

  private atualizarQuantidadeEstoque = async (
    produtoId: number,
    tipoMovimentacao: 'ENTRADA' | 'SAIDA',
    quantidade: number,
  ): Promise<void> => {
    const produto = await this.prisma.produto.findUnique({
      where: { id: produtoId },
    });

    if (!produto) {
      throw new NotFoundException(
        `Produto com ID ${produtoId} não encontrado.`,
      );
    }

    await this.prisma.produto.update({
      where: { id: produtoId },
      data: {
        quantidade:
          tipoMovimentacao === 'ENTRADA'
            ? produto.quantidade + quantidade
            : produto.quantidade - quantidade,
      },
    });
  };
}
