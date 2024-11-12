import { Module } from '@nestjs/common';
import { MedidaService } from './medida.service';
import { MedidaController } from './medida.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [MedidaController],
  providers: [JwtService,MedidaService, PrismaService],
})
export class MedidaModule {}
