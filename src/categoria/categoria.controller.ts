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
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Role } from 'src/auth/role.enum';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Roles(Role.Admin, Role.Storage)
  @Post('registro')
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.criarCategoria(createCategoriaDto);
  }

  @Roles(Role.Admin, Role.Storage)
  @Get()
  findAll() {
    return this.categoriaService.procurarTodos();
  }

  @Roles(Role.Admin, Role.Storage)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoriaService.procurarUm(+id);
  }

  @Roles(Role.Admin, Role.Storage)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriaService.update(+id, updateCategoriaDto);
  }

  @Roles(Role.Admin, 'admin', 'Admin')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriaService.remove(+id);
  }
}
