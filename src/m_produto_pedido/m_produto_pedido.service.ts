import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MProdutoPedido } from '@prisma/client';
import { CreateMProdutoPedidoDto } from './dto/create-m_produto_pedido.dto';
import { UpdateMProdutoPedidoDto } from './dto/update-m_produto_pedido.dto';

@Injectable()
export class MProdutoPedidoService {
  constructor(private readonly prisma: PrismaService) {}

  criarMProdutoPedido = async (
    createMProdutoPedidoDto: CreateMProdutoPedidoDto,
  ): Promise<MProdutoPedido> => {
    const { quantidade, produtoId, pedidoId } = createMProdutoPedidoDto;

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

    const novoMProdutoPedido = await this.prisma.mProdutoPedido.create({
      data: {
        quantidade,
        produtoId,
        pedidoId,
        valorTotal,
      },
    });

    await this.prisma.produto.update({
      where: { id: produtoId },
      data: { quantidade: produto.quantidade - quantidade },
    });

    return novoMProdutoPedido;
  };

  procurarTodos = async (): Promise<MProdutoPedido[]> => {
    return this.prisma.mProdutoPedido.findMany({
      include: {
        produto: true,
        pedido: true,
      },
    });
  };

  procurarUm = async (id: number): Promise<MProdutoPedido> => {
    const mProdutoPedido = await this.prisma.mProdutoPedido.findUnique({
      where: { id },
      include: {
        produto: true,
        pedido: true,
      },
    });

    if (!mProdutoPedido) {
      throw new NotFoundException(
        `Registro de movimentação com ID ${id} não encontrado.`,
      );
    }

    return mProdutoPedido;
  };

  update = async (
    id: number,
    updateMProdutoPedidoDto: UpdateMProdutoPedidoDto,
  ): Promise<MProdutoPedido> => {
    const mProdutoPedidoExistente = await this.prisma.mProdutoPedido.findUnique(
      {
        where: { id },
      },
    );

    if (!mProdutoPedidoExistente) {
      throw new NotFoundException(
        `Registro de movimentação com ID ${id} não encontrado.`,
      );
    }

    return this.prisma.mProdutoPedido.update({
      where: { id },
      data: updateMProdutoPedidoDto,
    });
  };

  remove = async (id: number) => {
    const mProdutoPedidoExistente = await this.prisma.mProdutoPedido.findUnique(
      {
        where: { id },
      },
    );

    if (!mProdutoPedidoExistente) {
      throw new NotFoundException(
        `Registro de movimentação com ID ${id} não encontrado.`,
      );
    }

    await this.prisma.mProdutoPedido.delete({
      where: { id },
    });

    return `Registro de movimentação com ID ${id} removido com sucesso.`;
  };
}
