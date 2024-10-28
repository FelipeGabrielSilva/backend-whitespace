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
import { CreateItemPedidoDto } from './dto/create-item_pedido.dto';
import { UpdateItemPedidoDto } from './dto/update-item_pedido.dto';
import { ItemPedidoService } from './item_pedido.service';
import { Roles } from 'src/auth/role.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('item-produto')
export class ItemProdutoController {
  constructor(private readonly itemProdutoService: ItemPedidoService) {}

  @Post('registro/:pedidoId')
create(@Param('pedidoId') pedidoId: number, @Body() createItemProdutoDto: CreateItemPedidoDto) {
  return this.itemProdutoService.criarItemPedido(createItemProdutoDto, pedidoId);
}

  @Get()
  findAll() {
    return this.itemProdutoService.procurarTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.itemProdutoService.procurarUm(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateItemProdutoDto: UpdateItemPedidoDto,
  ) {
    return this.itemProdutoService.update(+id, updateItemProdutoDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.itemProdutoService.remove(+id);
  }
}
