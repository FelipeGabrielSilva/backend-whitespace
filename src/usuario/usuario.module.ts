import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsuarioController],
  providers: [JwtService, UsuarioService, PrismaService],
  exports: [UsuarioService, UsuarioModule],
})
export class UsuarioModule {}
