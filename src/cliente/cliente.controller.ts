import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from 'src/auth/role.decorator';
import { FormatCpfCnpjInterceptor } from 'src/utils/cpf_cnpj_format.interceptor';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('cliente')
@UseInterceptors(FormatCpfCnpjInterceptor)
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Roles('admin')
  @Post('registro')
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.criarCliente(createClienteDto);
  }

  @Roles('admin')
  @Get()
  findAll() {
    return this.clienteService.procurarTodos();
  }

  @Roles('admin')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clienteService.procurarUm(+id);
  }

  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(+id, updateClienteDto);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clienteService.remove(+id);
  }
}
