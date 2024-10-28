import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async hashSenha(senha: string): Promise<string> {
    return await bcrypt.hash(senha, 10);
  }

  async validateUsuario(email: string, senha: string): Promise<any> {
    if (!email) {
      throw new Error('O campo email é obrigatório');
    }
  
    const usuario = await this.prisma.usuario.findUnique({
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
  
    // Retorna o usuário excluindo a senha
    const { senha: _, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }
  

  async login(usuario: any) {
    const payload = { email: usuario.email, sub: usuario.id, role: usuario.role };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
