import { PrismaService } from 'src/prisma.service';
import { CreateItemPedidoDto } from './dto/create-item_pedido.dto';
import { UpdateItemPedidoDto } from './dto/update-item_pedido.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ItemPedido } from '@prisma/client';

@Injectable()
export class ItemPedidoService {
  constructor(private readonly prisma: PrismaService) {}

  criarItemPedido = async (
    createItemPedidoDto: CreateItemPedidoDto,
    pedidoId: number,
  ): Promise<ItemPedido> => {
    const { quantidade, produtoId } = createItemPedidoDto;

    const produto = await this.prisma.produto.findUnique({
      where: { id: produtoId },
    });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    if (produto.quantidade < quantidade) {
      throw new BadRequestException(
        'Quantidade solicitada excede o estoque disponível',
      );
    }

    const valorTotal = produto.valorUn * quantidade;

    const novoItemPedido = await this.prisma.itemPedido.create({
      data: {
        quantidade: quantidade,
        valorTotal: valorTotal,
        produto: { connect: { id: produtoId } },
        pedido: { connect: { id: pedidoId } },
      },
    });

    return novoItemPedido;
  };

  procurarTodos = async (): Promise<ItemPedido[]> => {
    return this.prisma.itemPedido.findMany({
      include: {
        produto: true,
        pedido: true,
      },
    });
  };

  procurarUm = async (id: number): Promise<ItemPedido> => {
    const itemPedido = await this.prisma.itemPedido.findUnique({
      where: { id },
      include: {
        produto: true,
        pedido: true,
      },
    });

    if (!itemPedido) {
      throw new NotFoundException(
        `Registro de movimentação com ID ${id} não encontrado.`,
      );
    }

    return itemPedido;
  };

  update = async (
    id: number,
    updateItemProdutoDto: UpdateItemPedidoDto,
  ): Promise<ItemPedido> => {
    const itemPedidoExistente = await this.prisma.itemPedido.findUnique({
      where: { id },
    });

    if (!itemPedidoExistente) {
      throw new NotFoundException(
        `Registro de movimentação com ID ${id} não encontrado.`,
      );
    }

    return this.prisma.itemPedido.update({
      where: { id },
      data: updateItemProdutoDto,
    });
  };

  remove = async (id: number) => {
    const itemPedidoExistente = await this.prisma.itemPedido.findUnique({
      where: { id },
    });

    if (!itemPedidoExistente) {
      throw new NotFoundException(
        `Registro de movimentação com ID ${id} não encontrado.`,
      );
    }

    await this.prisma.itemPedido.delete({
      where: { id },
    });

    return `Registro de movimentação com ID ${id} removido com sucesso.`;
  };
}
