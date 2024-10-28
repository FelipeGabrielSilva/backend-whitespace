import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Roles } from 'src/auth/role.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'storage')
  @Post('registro')
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.criarCategoria(createCategoriaDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'storage')
  @Get()
  findAll() {
    return this.categoriaService.procurarTodos();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'storage')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoriaService.procurarUm(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'storage')
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriaService.update(+id, updateCategoriaDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'storage')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriaService.remove(+id);
  }
}
