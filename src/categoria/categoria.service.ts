import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(private prisma: PrismaService) {}

  criarCategoria = async (categoriaDto: CreateCategoriaDto) => {
    try {
      const { descricao, criadorId } = categoriaDto;

      const novaCategoria = await this.prisma.categoria.create({
        data: {
          descricao: descricao,
          criadorId,
        },
      });

      return novaCategoria;
    } catch (error) {
      throw new Error(`Erro ao criar categoria: ${error.message}`);
    }
  };

  procurarTodos = async () => {
    try {
      return await this.prisma.categoria.findMany();
    } catch (error) {
      throw new Error(`Erro ao procurar Categorias: ${error.message}`);
    }
  };

  procurarUm = async (id: number) => {
    try {
      const encontrado = await this.prisma.categoria.findUnique({
        where: { id: id },
      });

      if (encontrado) {
        return {
          message: 'Categoria encontrada!',
          encontrado,
        };
      }
    } catch (error) {
      throw new Error(`Erro ao procurar categoria: ${error.message}`);
    }
  };

  update = async (id: number, updateCategoriaDto: UpdateCategoriaDto) => {
    try {
      const encontrado = await this.prisma.categoria.findUnique({
        where: { id: id },
      });

      if (!encontrado) {
        throw new NotFoundException(`Categoria com ID ${id} não encontrada.`);
      }

      const categoriaAtualizada = await this.prisma.categoria.update({
        where: { id: encontrado.id },
        data: updateCategoriaDto,
      });

      return categoriaAtualizada;
    } catch (error) {
      throw new Error(`Erro ao atualizar categoria: ${error.message}`);
    }
  };

  remove = async (id: number) => {
    try {
      await this.prisma.categoria.delete({ where: { id: id } });

      return `Categoria com ID ${id} removido com sucesso.`;
    } catch (error) {
      throw new Error(`Erro ao deletar categoria: ${error.message}`);
    }
  };
}
