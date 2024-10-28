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
import { ProdutoFornecedorService } from './produto_fornecedor.service';
import { CreateProdutoFornecedorDto } from './dto/create-produto_fornecedor.dto';
import { UpdateProdutoFornecedorDto } from './dto/update-produto_fornecedor.dto';
import { Roles } from 'src/auth/role.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('produto-fornecedor')
export class ProdutoFornecedorController {
  constructor(
    private readonly produtoFornecedorService: ProdutoFornecedorService,
  ) {}

  @Post('registro')
  create(@Body() createProdutoFornecedorDto: CreateProdutoFornecedorDto) {
    return this.produtoFornecedorService.criarProdutoFornecedor(
      createProdutoFornecedorDto,
    );
  }

  @Get()
  findAll() {
    return this.produtoFornecedorService.procurarTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.produtoFornecedorService.procurarUm(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateProdutoFornecedorDto: UpdateProdutoFornecedorDto,
  ) {
    return this.produtoFornecedorService.update(
      +id,
      updateProdutoFornecedorDto,
    );
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.produtoFornecedorService.remove(+id);
  }
}
