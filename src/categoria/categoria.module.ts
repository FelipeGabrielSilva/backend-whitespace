import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CategoriaController],
  providers: [JwtService ,CategoriaService, PrismaService],
})
export class CategoriaModule {}
