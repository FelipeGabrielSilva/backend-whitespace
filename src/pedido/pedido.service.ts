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

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
      include: {
        cliente: true,
      },
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado.`);
    }

    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    const pedidoExistente = await this.prisma.pedido.findUnique({
      where: { id },
    });

    if (!pedidoExistente) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado.`);
    }

    return this.prisma.pedido.update({
      where: { id },
      data: {
        ...updatePedidoDto, // Atualiza os campos que foram passados
      },
    });
  }

  async remove(id: number): Promise<Pedido> {
    const pedidoExistente = await this.prisma.pedido.findUnique({
      where: { id },
    });

    if (!pedidoExistente) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado.`);
    }

    return this.prisma.pedido.delete({
      where: { id },
    });
  }
}
