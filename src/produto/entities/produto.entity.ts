import { Categoria } from 'src/categoria/entities/categoria.entity';

export class Produto {
  id: number;
  descricao: string;
  unMedidaId: number;
  precoCompra: number;
  valorUn: number;
  categoriaId: number;
  quantidade: number;
  criadorId: number;
  categoria: Categoria;
  fornecedorId: number;
}
