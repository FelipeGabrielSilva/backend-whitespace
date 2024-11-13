// src/produto/produto.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';  
import { Prisma } from '@prisma/client';

@Injectable()
export class ProdutoService {
  constructor(private prisma: PrismaService) {}

  // **Create a new product**
  async create(data: Prisma.produtoCreateInput) {
    return this.prisma.produto.create({
      data,
    });
  }

  // **Get all products**
  async findAll() {
    return this.prisma.produto.findMany();
  }

  // **Get a product by ID**
  async findOne(id: number) {
    return this.prisma.produto.findUnique({
      where: { id },
    });
  }

  // **Update a product by ID**
  async update(id: number, data: Prisma.produtoUpdateInput) {
    return this.prisma.produto.update({
      where: { id },
      data,
    });
  }

  // **Delete a product by ID**
  async remove(id: number) {
    return this.prisma.produto.delete({
      where: { id },
    });
  }
}
