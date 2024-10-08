import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FornecedorService {
  constructor(private prisma: PrismaService) {}

  criarFornecedor = async (fornecedorDto: CreateFornecedorDto) => {
    try {
      const { nome, cnpj, telefone, email, criadorId } = fornecedorDto;

      const novoFornecedor = await this.prisma.fornecedor.create({
        data: {
          nome,
          cnpj,
          telefone,
          email,
          criadorId,
        },
      });

      return novoFornecedor;
    } catch (error) {
      throw new Error(`Erro ao criar fornecedor: ${error.message}`);
    }
  };

  procurarTodos = async () => {
    return await this.prisma.fornecedor.findMany();
  };

  procurarUm = async (id: number) => {
    try {
      const encontrado = await this.prisma.fornecedor.findUnique({
        where: { id: id },
      });

      if (encontrado) {
        return {
          message: 'Fornecedor encontrado!',
          encontrado,
        };
      } else {
        throw new NotFoundException(`Fornecedor com ID ${id} não encontrado.`);
      }
    } catch (error) {
      throw new Error(`Erro ao procurar fornecedor: ${error.message}`);
    }
  };

  update = async (id: number, updateFornecedorDto: UpdateFornecedorDto) => {
    try {
      const encontrado = await this.prisma.fornecedor.findUnique({
        where: { id: id },
      });

      if (!encontrado) {
        throw new NotFoundException(`Fornecedor com ID ${id} não encontrado.`);
      }

      const fornecedorAtualizado = await this.prisma.fornecedor.update({
        where: { id: encontrado.id },
        data: updateFornecedorDto,
      });

      return fornecedorAtualizado;
    } catch (error) {
      throw new Error(`Erro ao atualizar fornecedor: ${error.message}`);
    }
  };

  remove = async (id: number) => {
    try {
      await this.prisma.fornecedor.delete({ where: { id: id } });
    } catch (error) {
      throw new Error(`Erro ao deletar fornecedor: ${error.message}`);
    }
  };
}
