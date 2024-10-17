import { Module } from '@nestjs/common';
import { MedidaService } from './medida.service';
import { MedidaController } from './medida.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MedidaController],
  providers: [MedidaService, PrismaService],
})
export class MedidaModule {}
