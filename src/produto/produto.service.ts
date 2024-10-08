import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from '@prisma/client'; // Importe o modelo Produto do Prisma
import { PrismaService } from 'src/prisma.service';

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
    } catch (error) {
      throw new Error(`Erro ao deletar produto: ${error.message}`);
    }
  };
}
