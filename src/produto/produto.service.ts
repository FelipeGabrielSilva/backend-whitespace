import { Injectable } from '@nestjs/common';
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

  async findOne(id: number) {
    return this.prisma.produto.findUnique({
      where: { id },
      include: {
        categoria: true,
      },
    });
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return this.prisma.produto.update({
      where: { id },
      data: updateProdutoDto,
    });
  }

  async remove(id: number) {
    return this.prisma.produto.delete({
      where: { id },
    });
  }
}
