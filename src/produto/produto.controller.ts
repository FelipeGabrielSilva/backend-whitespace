import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Roles } from 'src/auth/role.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post('registro')
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.criarProduto(createProdutoDto);
  }

  @Get()
  findAll() {
    return this.produtoService.procurarTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.produtoService.procurarUm(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateProdutoDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.produtoService.remove(+id);
  }
}
