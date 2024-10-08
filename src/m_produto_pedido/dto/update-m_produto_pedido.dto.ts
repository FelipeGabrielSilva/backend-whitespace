import { PartialType } from '@nestjs/mapped-types';
import { CreateMProdutoPedidoDto } from './create-m_produto_pedido.dto';

export class UpdateMProdutoPedidoDto extends PartialType(CreateMProdutoPedidoDto) {}
