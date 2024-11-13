import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ItemPedidoService } from 'src/item_pedido/item_pedido.service';
import { MovimentacaoEstoqueService } from 'src/movimentacao_estoque/movimentacao_estoque.service';

@Injectable()
export class PedidoService {
  constructor(
    private prisma: PrismaService,
    private itemPedidoService: ItemPedidoService,
    private movimentacaoEstoqueService: MovimentacaoEstoqueService,
  ) {}

  async criarPedido(pedidoDto: CreatePedidoDto) {
    try {
      const { clienteId, produtos } = pedidoDto;

      const novoPedido = await this.prisma.pedido.create({
        data: {
          clienteId,
        },
      });

      await Promise.all(
        produtos.map(async (produtoDto) => {
          await this.itemPedidoService.criarItemPedido(
            produtoDto,
            novoPedido.id,
          );

          await this.movimentacaoEstoqueService.criarMovimentacao({
            produtoId: produtoDto.produtoId,
            tipo: 'SAIDA',
            quantidade: produtoDto.quantidade,
            observacao: `Saída por pedido: ${novoPedido.id}`,
            criadorId: 1,
          });
        }),
      );

      return novoPedido;
    } catch (error) {
      throw new Error(`Erro ao criar pedido: ${error.message}`);
    }
  }

  procurarTodos = async () => {
    return await this.prisma.pedido.findMany({
      include: { cliente: true },
    });
  };

  procurarUm = async (id: number) => {
    try {
      const encontrado = await this.prisma.pedido.findUnique({
        where: { id },
        include: { cliente: true },
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
        where: { id },
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
      await this.prisma.pedido.delete({ where: { id } });

      return `Pedido com ID ${id} removido com sucesso.`;
    } catch (error) {
      throw new Error(`Erro ao deletar pedido: ${error.message}`);
    }
  };
}
