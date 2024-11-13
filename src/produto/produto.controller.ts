import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Prisma } from '@prisma/client';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  // **Create a new product**
  @Post()
  async create(@Body() data: Prisma.produtoCreateInput) {
    return this.produtoService.create(data);
  }

  // **Get all products**
  @Get()
  async findAll() {
    return this.produtoService.findAll();
  }

  // **Get product by ID**
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  // **Update product by ID**
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.produtoUpdateInput,
  ) {
    return this.produtoService.update(+id, data);
  }

  // **Delete product by ID**
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }
}
