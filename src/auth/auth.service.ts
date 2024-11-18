import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usuario: UsuarioService,
  ) {}

  async hashSenha(senha: string): Promise<string> {
    return await bcrypt.hash(senha, 10);
  }

  async validateUsuario(email: string, senha: string): Promise<any> {
    if (!email) {
      throw new Error('O campo email é obrigatório');
    }

    const usuario = await this.prisma.usuario.findFirst({
      where: { email },
    });

    if (!usuario || !usuario.senha) {
      throw new Error('Usuário não encontrado ou senha ausente');
    }

    if (!senha) {
      throw new Error('O campo senha é obrigatório');
    }

    const isPasswordMatching = await bcrypt.compare(senha, usuario.senha);
    if (!isPasswordMatching) {
      return null;
    }

    const { senha: _, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }

  async login(usuario: any) {
    const payload = {
      email: usuario.email,
      sub: usuario.id,
      role: usuario.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      payload,
    };
  }

  async getUsuarioLogado(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.usuario.procurarUm(decoded.sub);

      if (user) {
        return user;
      }

      return null;
    } catch (error) {
      throw new Error('Token inválido ou expirado');
    }
  }
}
