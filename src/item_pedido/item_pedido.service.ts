import { PrismaService } from 'src/prisma.service';
import { CreateItemPedidoDto } from './dto/create-item_pedido.dto';
import { UpdateItemPedidoDto } from './dto/update-item_pedido.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { itempedido } from '@prisma/client';

@Injectable()
export class ItemPedidoService {
  constructor(private readonly prisma: PrismaService) {}

  criarItemPedido = async (
    createItemPedidoDto: CreateItemPedidoDto,
    pedidoId: number,
  ): Promise<itempedido> => {
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

    const novoItemPedido = await this.prisma.itempedido.create({
      data: {
        quantidade: quantidade,
        valorTotal: valorTotal,
        produto: { connect: { id: produtoId } },
        pedido: { connect: { id: pedidoId } },
      },
    });

    return novoItemPedido;
  };

  procurarTodos = async (): Promise<itempedido[]> => {
    return this.prisma.itempedido.findMany({
      include: {
        produto: true,
        pedido: true,
      },
    });
  };

  procurarUm = async (id: number): Promise<itempedido> => {
    const itemPedido = await this.prisma.itempedido.findUnique({
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
  ): Promise<itempedido> => {
    const itemPedidoExistente = await this.prisma.itempedido.findUnique({
      where: { id },
    });

    if (!itemPedidoExistente) {
      throw new NotFoundException(
        `Registro de movimentação com ID ${id} não encontrado.`,
      );
    }

    return this.prisma.itempedido.update({
      where: { id },
      data: updateItemProdutoDto,
    });
  };

  remove = async (id: number) => {
    const itemPedidoExistente = await this.prisma.itempedido.findUnique({
      where: { id },
    });

    if (!itemPedidoExistente) {
      throw new NotFoundException(
        `Registro de movimentação com ID ${id} não encontrado.`,
      );
    }

    await this.prisma.itempedido.delete({
      where: { id },
    });

    return `Registro de movimentação com ID ${id} removido com sucesso.`;
  };
}
