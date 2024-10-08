import { Categoria } from 'src/categoria/entities/categoria.entity';

export class Produto {
  id: number;
  descricao: string;
  unMedida: string;
  valorUn: number;
  categoriaId: number;
  quantidade: number;
  criadorId: number;
  categoria: Categoria;
}
