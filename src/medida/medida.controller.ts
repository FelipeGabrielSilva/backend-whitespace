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
import { CreateMedidaDto } from './dto/create-medida.dto';
import { UpdateMedidaDto } from './dto/update-medida.dto';
import { MedidaService } from './medida.service';

@Controller('medida')
export class MedidaController {
  constructor(private readonly medidaService: MedidaService) {}

  @Roles('admin, storage')
  @Post('registro')
  create(@Body() createMedidaDto: CreateMedidaDto) {
    return this.medidaService.criarMedida(createMedidaDto);
  }

  @Roles('admin, storage')
  @Get()
  findAll() {
    return this.medidaService.procurarTodas();
  }

  @Roles('admin, storage')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medidaService.procurarUma(+id);
  }

  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedidaDto: UpdateMedidaDto) {
    return this.medidaService.update(+id, updateMedidaDto);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medidaService.remove(+id);
  }
}
