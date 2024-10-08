import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MProdutoPedidoService } from './m_produto_pedido.service';
import { CreateMProdutoPedidoDto } from './dto/create-m_produto_pedido.dto';
import { UpdateMProdutoPedidoDto } from './dto/update-m_produto_pedido.dto';

@Controller('m-produto-pedido')
export class MProdutoPedidoController {
  constructor(private readonly mProdutoPedidoService: MProdutoPedidoService) {}

  @Post('registro')
  create(@Body() createMProdutoPedidoDto: CreateMProdutoPedidoDto) {
    return this.mProdutoPedidoService.criarMProdutoPedido(
      createMProdutoPedidoDto,
    );
  }

  @Get()
  findAll() {
    return this.mProdutoPedidoService.procurarTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.mProdutoPedidoService.procurarUm(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateMProdutoPedidoDto: UpdateMProdutoPedidoDto,
  ) {
    return this.mProdutoPedidoService.update(id, updateMProdutoPedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.mProdutoPedidoService.remove(id);
  }
}
