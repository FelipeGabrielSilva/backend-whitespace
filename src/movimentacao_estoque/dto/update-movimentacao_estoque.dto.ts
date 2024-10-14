import { PartialType } from '@nestjs/mapped-types';
import { CreateMovimentacaoEstoqueDto } from './create-movimentacao_estoque.dto';

export class UpdateMovimentacaoEstoqueDto extends PartialType(CreateMovimentacaoEstoqueDto) {}
