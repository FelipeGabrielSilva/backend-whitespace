import { Produto } from 'src/produto/entities/produto.entity';

export class Categoria {
  id: number;
  descricao: string;
  criadorId: number;
  produtos: Produto[];
}
