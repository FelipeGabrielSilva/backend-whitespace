export class CreateClienteDto {
  nome: string;
  cnpjCpf: string;
  endereco: string;
  telefone: string;
  email: string;
  criadorId?: number;
}
