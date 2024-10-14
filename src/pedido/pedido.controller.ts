import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

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
