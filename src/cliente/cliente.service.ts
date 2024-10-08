import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ClienteService {
  constructor(private prisma: PrismaService) {}

  criarCliente = async (clienteDto: CreateClienteDto) => {
    try {
      const { nome, cnpjCpf, endereco, telefone, email, criadorId } =
        clienteDto;

      const novoCliente = await this.prisma.cliente.create({
        data: {
          nome,
          cnpjCpf,
          endereco,
          telefone,
          email,
          criadorId,
        },
      });

      return novoCliente;
    } catch (error) {
      throw new Error(`Erro ao criar cliente: ${error.message}`);
    }
  };

  procurarTodos = async () => {
    return await this.prisma.cliente.findMany();
  };

  procurarUm = async (id: number) => {
    try {
      const encontrado = await this.prisma.cliente.findUnique({
        where: { id: id },
      });

      if (encontrado) {
        return {
          message: 'Cliente encontrado!',
          encontrado,
        };
      } else {
        throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
      }
    } catch (error) {
      throw new Error(`Erro ao procurar cliente: ${error.message}`);
    }
  };

  update = async (id: number, updateClienteDto: UpdateClienteDto) => {
    try {
      const encontrado = await this.prisma.cliente.findUnique({
        where: { id: id },
      });

      if (!encontrado) {
        throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
      }

      const clienteAtualizado = await this.prisma.cliente.update({
        where: { id: encontrado.id },
        data: updateClienteDto,
      });

      return clienteAtualizado;
    } catch (error) {
      throw new Error(`Erro ao atualizar cliente: ${error.message}`);
    }
  };

  remove = async (id: number) => {
    try {
      await this.prisma.cliente.delete({ where: { id: id } });
    } catch (error) {
      throw new Error(`Erro ao deletar cliente: ${error.message}`);
    }
  };
}
