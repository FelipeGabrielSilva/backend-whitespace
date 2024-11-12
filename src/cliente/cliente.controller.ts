import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { FormatCpfCnpjInterceptor } from 'src/utils/cpf_cnpj_format.interceptor';
import { Roles } from 'src/auth/role.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('cliente')
@UseInterceptors(FormatCpfCnpjInterceptor)
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  
  @Post('registro')
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.criarCliente(createClienteDto);
  }

  @Get()
  findAll() {
    return this.clienteService.procurarTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clienteService.procurarUm(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(+id, updateClienteDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clienteService.remove(+id);
  }
}
