import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { PrismaService } from 'src/prisma.service';
import { ClienteController } from './cliente.controller';

@Module({
  controllers: [ClienteController],
  providers: [ClienteService, PrismaService],
})
export class ClienteModule {}
