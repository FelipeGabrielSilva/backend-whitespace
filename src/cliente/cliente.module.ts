import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { PrismaService } from 'src/prisma.service';
import { ClienteController } from './cliente.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ClienteController],
  providers: [JwtService, ClienteService, PrismaService],
})
export class ClienteModule {}
