import { Injectable } from '@nestjs/common';
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
    return await this.prisma.categoria.findMany();
  };

  findOne(id: number) {
    return `This action returns a #${id} categoria`;
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoria`;
  }
}
