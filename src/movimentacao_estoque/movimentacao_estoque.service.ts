import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMovimentacaoEstoqueDto } from './dto/create-movimentacao_estoque.dto';
import { UpdateMovimentacaoEstoqueDto } from './dto/update-movimentacao_estoque.dto';

@Injectable()
export class MovimentacaoEstoqueService {
  constructor(private prisma: PrismaService) {}

  criarMovimentacao = async (data: CreateMovimentacaoEstoqueDto) => {
    try {
      const { produtoId, quantidade, ...restoData } = data;

      const produto = await this.prisma.produto.findUnique({
        where: { id: produtoId },
      });

      if (!produto) {
        throw new NotFoundException(
          `Produto com ID ${produtoId} não encontrado.`,
        );
      }

      const movimentacao = await this.prisma.movimentacaoestoque.create({
        data: {
          ...restoData,
          produto: { connect: { id: produtoId } },
          quantidade: data.tipo === 'ENTRADA' ? quantidade : -quantidade,
        },
      });

      await this.prisma.produto.update({
        where: { id: produtoId },
        data: {
          quantidade:
            data.tipo === 'ENTRADA'
              ? produto.quantidade + quantidade
              : produto.quantidade - quantidade,
        },
      });

      return { message: 'Movimentação registrada com sucesso!', movimentacao };
    } catch (error) {
      throw new Error(`Erro ao registrar movimentação: ${error.message}`);
    }
  };

  procurarTodos = async () => {
    return this.prisma.movimentacaoestoque.findMany({
      include: { produto: true },
    });
  };

  procurarUm = async (id: number) => {
    try {
      const encontrado = await this.prisma.movimentacaoestoque.findUnique({
        where: { id },
        include: { produto: true },
      });

      if (encontrado) {
        return {
          message: 'Movimentação encontrada!',
          encontrado,
        };
      } else {
        throw new NotFoundException(
          `Movimentação com ID ${id} não encontrada.`,
        );
      }
    } catch (error) {
      throw new Error(`Erro ao procurar movimentação: ${error.message}`);
    }
  };

  update = async (
    id: number,
    updateMovimentacaoDto: UpdateMovimentacaoEstoqueDto,
  ) => {
    try {
      const encontrado = await this.prisma.movimentacaoestoque.findUnique({
        where: { id },
      });

      if (!encontrado) {
        throw new NotFoundException(
          `Movimentação com ID ${id} não encontrada.`,
        );
      }

      const movimentacaoAtualizada =
        await this.prisma.movimentacaoestoque.update({
          where: { id: encontrado.id },
          data: updateMovimentacaoDto,
        });

      return movimentacaoAtualizada;
    } catch (error) {
      throw new Error(`Erro ao atualizar movimentação: ${error.message}`);
    }
  };

  remove = async (id: number) => {
    try {
      await this.prisma.movimentacaoestoque.delete({ where: { id } });

      return `Movimentação com ID ${id} removida com sucesso.`;
    } catch (error) {
      throw new Error(`Erro ao deletar movimentação: ${error.message}`);
    }
  };
}
