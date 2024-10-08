import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  criarUsuario = async (usuarioDto: CreateUsuarioDto) => {
    try {
      const { nome, email, senha } = usuarioDto;

      const usuario = await this.prisma.usuario.create({
        data: {
          nome: nome,
          email: email,
          senha: senha,
        },
      });

      return {
        message: 'Usuário criado com sucesso!',
        usuario,
      };
    } catch (error) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  };

  procurarTodos = async () => {
    try {
      return await this.prisma.usuario.findMany();
    } catch (error) {
      throw new Error(`Erro ao procurar todo os usuários: ${error}`);
    }
  };

  procurarUm = async (id: number) => {
    try {
      const usuario = await this.prisma.usuario.findUnique({
        where: { id: id },
      });

      return {
        message: 'Usuário encontrado!',
        usuario,
      };
    } catch (error) {
      throw new Error(`Error ao procurar usuário: ${error}`);
    }
  };

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
