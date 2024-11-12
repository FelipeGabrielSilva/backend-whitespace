import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Role } from 'src/auth/role.enum';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  criarUsuario = async (usuarioDto: CreateUsuarioDto) => {
    try {
      const { nome, email, senha, role } = usuarioDto;

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(senha, saltRounds);

      if (email === 'felipe@gmail.com') {
        const admin = await this.prisma.usuario.create({
          data: {
            nome: nome,
            email: email,
            senha: hashedPassword,
            role: role || Role.Admin,
          },
        });

        return {
          message: 'Usuário criado com sucesso!',
          admin,
        };
      }

      const usuario = await this.prisma.usuario.create({
        data: {
          nome: nome,
          email: email,
          senha: hashedPassword,
          role: role || Role.User,
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
    console.log('ID recebido:', id); // Verifique o valor do id

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

  update = async (id: number, updateUsuarioDto: UpdateUsuarioDto) => {
    try {
      const usuarioExistente = await this.prisma.usuario.findUnique({
        where: { id: id },
      });

      if (!usuarioExistente) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
      }

      const usuarioAtualizado = await this.prisma.usuario.update({
        where: { id },
        data: updateUsuarioDto,
      });

      return {
        message: 'Usuário atualizado com sucesso!',
        usuario: usuarioAtualizado,
      };
    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  };

  remove = async (id: number) => {
    try {
      const usuarioExistente = await this.prisma.usuario.findUnique({
        where: { id },
      });

      if (!usuarioExistente) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
      }

      await this.prisma.usuario.delete({
        where: { id },
      });

      return {
        message: `Usuário com ID ${id} removido com sucesso.`,
      };
    } catch (error) {
      throw new Error(`Erro ao remover usuário: ${error.message}`);
    }
  };
}
