import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PedidoService {
  constructor(private readonly prisma: PrismaService) {}

  criarPedido = async (createPedidoDto: CreatePedidoDto): Promise<Pedido> => {
    try {
      const { clienteId, status } = createPedidoDto;

      const novoPedido = await this.prisma.pedido.create({
        data: {
          clienteId,
          status,
        },
      });

      return novoPedido;
    } catch (error) {
      throw new Error(`Erro ao criar pedido: ${error}`);
    }
  };

  procurarTodos = async () => {
    return await this.prisma.pedido.findMany({
      include: {
        cliente: true,
      },
    });
  };

  procurarUm = async (id: number) => {
    try {
      const encontrado = await this.prisma.pedido.findUnique({
        where: { id: id },
      });

      if (encontrado) {
        return {
          message: 'Pedido encontrado!',
          encontrado,
        };
      } else {
        throw new NotFoundException(`Pedido com ID ${id} não encontrado.`);
      }
    } catch (error) {
      throw new Error(`Erro ao procurar pedido: ${error.message}`);
    }
  };

  update = async (id: number, updatePedidoDto: UpdatePedidoDto) => {
    try {
      const encontrado = await this.prisma.pedido.findUnique({
        where: { id: id },
      });

      if (!encontrado) {
        throw new NotFoundException(`Pedido com ID ${id} não encontrado.`);
      }

      const pedidoAtualizado = await this.prisma.pedido.update({
        where: { id: encontrado.id },
        data: updatePedidoDto,
      });

      return pedidoAtualizado;
    } catch (error) {
      throw new Error(`Erro ao atualizar pedido: ${error.message}`);
    }
  };

  remove = async (id: number) => {
    try {
      await this.prisma.pedido.delete({ where: { id: id } });
    } catch (error) {
      throw new Error(`Erro ao deletar pedido: ${error.message}`);
    }
  };
}
