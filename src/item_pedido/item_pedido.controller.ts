import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateItemPedidoDto } from './dto/create-item_pedido.dto';
import { UpdateItemPedidoDto } from './dto/update-item_pedido.dto';
import { ItemPedidoService } from './item_pedido.service';

@Controller('item-produto')
export class ItemProdutoController {
  constructor(private readonly itemProdutoService: ItemPedidoService) {}

  @Post('registro/:pedidoId')
  create(
    @Param('pedidoId') pedidoId: number,
    @Body() createItemProdutoDto: CreateItemPedidoDto,
  ) {
    return this.itemProdutoService.criarItemPedido(
      createItemProdutoDto,
      pedidoId,
    );
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

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.itemProdutoService.remove(+id);
  }
}
