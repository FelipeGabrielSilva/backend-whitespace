import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMedidaDto {
  @IsString()
  @IsNotEmpty()
  descricao: string;
}
