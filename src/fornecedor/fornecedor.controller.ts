import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FornecedorService } from './fornecedor.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';

@Controller('fornecedor')
export class FornecedorController {
  constructor(private readonly fornecedorService: FornecedorService) {}

  @Post('registro')
  create(@Body() createFornecedorDto: CreateFornecedorDto) {
    return this.fornecedorService.criarFornecedor(createFornecedorDto);
  }

  @Get()
  findAll() {
    return this.fornecedorService.procurarTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fornecedorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFornecedorDto: UpdateFornecedorDto,
  ) {
    return this.fornecedorService.update(+id, updateFornecedorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fornecedorService.remove(+id);
  }
}
