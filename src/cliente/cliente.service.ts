import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} cliente`;
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return `This action updates a #${id} cliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
