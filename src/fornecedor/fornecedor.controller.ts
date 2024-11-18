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
import { FormatCpfCnpjInterceptor } from 'src/utils/cpf_cnpj_format.interceptor';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { FornecedorService } from './fornecedor.service';

@Controller('fornecedor')
@UseInterceptors(FormatCpfCnpjInterceptor)
export class FornecedorController {
  constructor(private readonly fornecedorService: FornecedorService) {}

  @Post('registro')
  create(@Body() createFornecedorDto: CreateFornecedorDto) {
    console.log(createFornecedorDto);
    return this.fornecedorService.criarFornecedor(createFornecedorDto);
  }

  @Get()
  findAll() {
    return this.fornecedorService.procurarTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.fornecedorService.procurarUm(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateFornecedorDto: UpdateFornecedorDto,
  ) {
    return this.fornecedorService.update(+id, updateFornecedorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.fornecedorService.remove(+id);
  }
}
