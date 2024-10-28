import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UpdateMovimentacaoEstoqueDto } from './dto/update-movimentacao_estoque.dto';
import { MovimentacaoEstoqueService } from './movimentacao_estoque.service';
import { Roles } from 'src/auth/role.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('movimentacoes')
export class MovimentacaoEstoqueController {
  constructor(
    private readonly movimentacaoEstoqueService: MovimentacaoEstoqueService,
  ) {}

  @Get()
  procurarTodos() {
    return this.movimentacaoEstoqueService.procurarTodos();
  }

  @Get(':id')
  procurarUm(@Param('id', ParseIntPipe) id: number) {
    return this.movimentacaoEstoqueService.procurarUm(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovimentacaoDto: UpdateMovimentacaoEstoqueDto,
  ) {
    return this.movimentacaoEstoqueService.update(id, updateMovimentacaoDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.movimentacaoEstoqueService.remove(id);
  }
}
