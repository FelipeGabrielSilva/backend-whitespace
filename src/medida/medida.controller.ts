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
import { MedidaService } from './medida.service';
import { CreateMedidaDto } from './dto/create-medida.dto';
import { UpdateMedidaDto } from './dto/update-medida.dto';
import { Roles } from 'src/auth/role.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('medida')
export class MedidaController {
  constructor(private readonly medidaService: MedidaService) {}

  @Post('registro')
  create(@Body() createMedidaDto: CreateMedidaDto) {
    return this.medidaService.criarMedida(createMedidaDto);
  }

  @Get()
  findAll() {
    return this.medidaService.procurarTodas();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medidaService.procurarUma(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedidaDto: UpdateMedidaDto) {
    return this.medidaService.update(+id, updateMedidaDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medidaService.remove(+id);
  }
}
