import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PedidoService } from './pedido.service';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post('registro')
  criar(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidoService.criarPedido(createPedidoDto);
  }

  @Get()
  procurarTodos() {
    return this.pedidoService.procurarTodos();
  }

  @Get(':id')
  procurarUm(@Param('id', ParseIntPipe) id: number) {
    return this.pedidoService.procurarUm(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePedidoDto: UpdatePedidoDto,
  ) {
    return this.pedidoService.update(id, updatePedidoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pedidoService.remove(id);
  }
}
