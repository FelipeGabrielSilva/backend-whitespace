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
import { CreateItemPedidoDto } from './dto/create-item_pedido.dto';
import { UpdateItemPedidoDto } from './dto/update-item_pedido.dto';
import { ItemPedidoService } from './item_pedido.service';

@Controller('item-produto')
export class ItemProdutoController {
  constructor(private readonly itemProdutoService: ItemPedidoService) {}

  @Roles('admin')
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

  @Roles('admin, storage')
  @Get()
  findAll() {
    return this.itemProdutoService.procurarTodos();
  }

  @Roles('admin, storage')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.itemProdutoService.procurarUm(+id);
  }

  @Roles('admin')
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateItemProdutoDto: UpdateItemPedidoDto,
  ) {
    return this.itemProdutoService.update(+id, updateItemProdutoDto);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.itemProdutoService.remove(+id);
  }
}
