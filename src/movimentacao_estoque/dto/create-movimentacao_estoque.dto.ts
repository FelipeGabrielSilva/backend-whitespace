import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { movimentacaoestoque_tipo } from '@prisma/client';

export class CreateMovimentacaoEstoqueDto {
  @IsInt()
  produtoId: number;

  @IsEnum(movimentacaoestoque_tipo)
  tipo: movimentacaoestoque_tipo;

  @IsInt()
  quantidade: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  observacao?: string;

  @IsInt()
  criadorId: number;
}
