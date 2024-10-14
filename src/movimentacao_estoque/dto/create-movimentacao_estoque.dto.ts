import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TipoMovimentacao } from '@prisma/client';

export class CreateMovimentacaoEstoqueDto {
  @IsInt()
  produtoId: number;

  @IsEnum(TipoMovimentacao)
  tipo: TipoMovimentacao;

  @IsInt()
  quantidade: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  observacao?: string;

  @IsInt()
  criadorId: number;
}
