import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMedidaDto } from './dto/create-medida.dto';
import { UpdateMedidaDto } from './dto/update-medida.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MedidaService {
  constructor(private readonly prisma: PrismaService) {}

  criarMedida = async (createMedidaDto: CreateMedidaDto) => {
    try {
      const { descricao } = createMedidaDto;

      const novaMedida = await this.prisma.medida.create({
        data: {
          descricao,
        },
      });

      if (novaMedida)
        return { message: `Medida criada com sucesso!`, novaMedida };
      else {
        throw new NotAcceptableException(`Ocorreu um erro ao criar a medida.`);
      }
    } catch (error) {
      throw new Error(
        `Algo deu errado na requisição para criar a medida. O erro: ${error}`,
      );
    }
  };

  procurarTodas = async () => {
    try {
      return await this.prisma.medida.findMany();
      
    } catch (error) {
      throw new Error(
        `Algo deu errado na requisição para listar todas as medidas. O erro: ${error}`,
      );
    }
  };

  procurarUma = async (id: number) => {
    try {
      const medida = await this.prisma.medida.findUnique({ where: { id: id } });

      return medida;
    } catch (error) {
      throw new Error(
        `Algo deu errado na requisição para procurar uma medidas. O erro: ${error}`,
      );
    }
  };

  update = async (id: number, updateMedidaDto: UpdateMedidaDto) => {
    try {
      const medida = await this.prisma.medida.findUnique({ where: { id: id } });

      if (medida) {
        const medidaAtualizada = await this.prisma.medida.update({
          where: { id: medida.id },
          data: updateMedidaDto,
        });

        return medidaAtualizada;
      } else {
        throw new NotFoundException(
          `Algo deu errado. A medida selecionada para ser atualizada não existe.`,
        );
      }
    } catch (error) {
      throw new Error(
        `Algo deu errado na requisição para atualizar uma medidas. O erro: ${error}`,
      );
    }
  };

  remove = async (id: number) => {
    try {
      await this.prisma.medida.delete({ where: { id: id } });
      return `Medida excluída com sucesso.`;
    } catch (error) {
      throw new BadRequestException(
        `Algo deu errado: Não foi possível excluir a medida. O erro: ${error}`,
      );
    }
  };
}
