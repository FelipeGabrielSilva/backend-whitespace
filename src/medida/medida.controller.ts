import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMedidaDto } from './dto/create-medida.dto';
import { UpdateMedidaDto } from './dto/update-medida.dto';
import { MedidaService } from './medida.service';

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medidaService.remove(+id);
  }
}
