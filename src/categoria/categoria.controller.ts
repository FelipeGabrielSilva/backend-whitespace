import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  
  @Post('registro')
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.criarCategoria(createCategoriaDto);
  }

  
  @Get()
  findAll() {
    return this.categoriaService.procurarTodos();
  }

  
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoriaService.procurarUm(+id);
  }

  
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriaService.update(+id, updateCategoriaDto);
  }

  
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriaService.remove(+id);
  }
}
