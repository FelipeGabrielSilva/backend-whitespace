import { PartialType } from '@nestjs/mapped-types';
import { CreateProdutoFornecedorDto } from './create-produto_fornecedor.dto';

export class UpdateProdutoFornecedorDto extends PartialType(CreateProdutoFornecedorDto) {}
