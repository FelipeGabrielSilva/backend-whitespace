import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/role.enum';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoService } from './produto.service';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Roles(Role.Admin, Role.Storage)
  @Post('registro')
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.criarProduto(createProdutoDto);
  }

  @Roles(Role.Admin, Role.Storage)
  @Get()
  findAll() {
    return this.produtoService.procurarTodos();
  }

  @Roles(Role.Admin, Role.Storage)
  @Get(':id')
  findOne(@Param('id') idProd: number) {
    return this.produtoService.procurarUm(+idProd);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateProdutoDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.produtoService.remove(+id);
  }
}
