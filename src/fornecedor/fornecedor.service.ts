import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} fornecedor`;
  }

  update(id: number, updateFornecedorDto: UpdateFornecedorDto) {
    return `This action updates a #${id} fornecedor`;
  }

  remove(id: number) {
    return `This action removes a #${id} fornecedor`;
  }
}
