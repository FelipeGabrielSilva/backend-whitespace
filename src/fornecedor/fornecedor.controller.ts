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
import { FornecedorService } from './fornecedor.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { FormatCpfCnpjInterceptor } from 'src/utils/cpf_cnpj_format.interceptor';
import { Roles } from 'src/auth/role.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.fornecedorService.remove(+id);
  }
}
