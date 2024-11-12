import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Role } from '../src/auth/role.enum';

const prisma = new PrismaClient();

const usuarios = [
  {
    nome: 'Alice Souza',
    email: 'alice@example.com',
    senha: 'senha123',
    role: Role.Admin,
  },
  {
    nome: 'Bruno Mendes',
    email: 'bruno@example.com',
    senha: 'senha123',
    role: Role.User,
  },
  {
    nome: 'Carla Dias',
    email: 'carla@example.com',
    senha: 'senha123',
    role: Role.Storage,
  },
  {
    nome: 'Diego Santos',
    email: 'diego@example.com',
    senha: 'senha123',
    role: Role.Admin,
  },
  {
    nome: 'Elena Lima',
    email: 'elena@example.com',
    senha: 'senha123',
    role: Role.User,
  },
  {
    nome: 'Felipe Araújo',
    email: 'felipe@example.com',
    senha: 'senha123',
    role: Role.Storage,
  },
  {
    nome: 'Gabriela Nunes',
    email: 'gabriela@example.com',
    senha: 'senha123',
    role: Role.Admin,
  },
  {
    nome: 'Henrique Farias',
    email: 'henrique@example.com',
    senha: 'senha123',
    role: Role.User,
  },
  {
    nome: 'Isabela Campos',
    email: 'isabela@example.com',
    senha: 'senha123',
    role: Role.Storage,
  },
  {
    nome: 'João Pedro',
    email: 'joao@example.com',
    senha: 'senha123',
    role: Role.Admin,
  },
  {
    nome: 'Larissa Vieira',
    email: 'larissa@example.com',
    senha: 'senha123',
    role: Role.User,
  },
  {
    nome: 'Marcos Silva',
    email: 'marcos@example.com',
    senha: 'senha123',
    role: Role.Storage,
  },
  {
    nome: 'Natalia Gonçalves',
    email: 'natalia@example.com',
    senha: 'senha123',
    role: Role.Admin,
  },
  {
    nome: 'Otávio Moraes',
    email: 'otavio@example.com',
    senha: 'senha123',
    role: Role.User,
  },
  {
    nome: 'Priscila Martins',
    email: 'priscila@example.com',
    senha: 'senha123',
    role: Role.Storage,
  },
  {
    nome: 'Renato Costa',
    email: 'renato@example.com',
    senha: 'senha123',
    role: Role.Admin,
  },
  {
    nome: 'Sabrina Rocha',
    email: 'sabrina@example.com',
    senha: 'senha123',
    role: Role.User,
  },
  {
    nome: 'Thiago Sousa',
    email: 'thiago@example.com',
    senha: 'senha123',
    role: Role.Storage,
  },
  {
    nome: 'Ursula Matos',
    email: 'ursula@example.com',
    senha: 'senha123',
    role: Role.Admin,
  },
  {
    nome: 'Victor Almeida',
    email: 'victor@example.com',
    senha: 'senha123',
    role: Role.User,
  },
];

const categorias = [
  { descricao: 'Eletrônico', criadorId: 1 },
  { descricao: 'Eletrodoméstico', criadorId: 1 },
  { descricao: 'Móveis', criadorId: 1 },
  { descricao: 'Roupas', criadorId: 1 },
  { descricao: 'Alimentos', criadorId: 1 },
  { descricao: 'Bebidas', criadorId: 1 },
  { descricao: 'Brinquedos', criadorId: 1 },
  { descricao: 'Ferramentas', criadorId: 1 },
  { descricao: 'Automotivo', criadorId: 1 },
  { descricao: 'Esportes', criadorId: 1 },
  { descricao: 'Jardinagem', criadorId: 1 },
  { descricao: 'Papelaria', criadorId: 1 },
  { descricao: 'Saúde e Beleza', criadorId: 1 },
  { descricao: 'Informática', criadorId: 1 },
  { descricao: 'Livros', criadorId: 1 },
  { descricao: 'Música', criadorId: 1 },
  { descricao: 'Cinema e TV', criadorId: 1 },
  { descricao: 'Pet Shop', criadorId: 1 },
  { descricao: 'Construção', criadorId: 1 },
  { descricao: 'Moda', criadorId: 1 },
];

const medidas = [
  { descricao: 'Unidade', criadorId: 1 },
  { descricao: 'Kg', criadorId: 1 },
  { descricao: 'Litro', criadorId: 1 },
  { descricao: 'Pacote', criadorId: 1 },
];



const produtos = [
  {
    descricao: 'Monitor Gamer 27" Full HD 144Hz',
    medidaId: 1, // Unidade
    precoCompra: 1200.0,
    valorUn: 2500.0,
    categoriaId: 15, // Informática
    quantidade: 50,
    criadorId: 1,
    fornecedorId: 1 // Distribuidora B
  },
  {
    descricao: 'Notebook Dell Inspiron 15',
    medidaId: 1, // Unidade
    precoCompra: 3000.0,
    valorUn: 5500.0,
    categoriaId: 15, // Informática
    quantidade: 30,
    criadorId: 1,
    fornecedorId: 1 // Importadora J
  },
  {
    descricao: 'Teclado Mecânico RGB',
    medidaId: 1, // Unidade
    precoCompra: 250.0,
    valorUn: 500.0,
    categoriaId: 15, // Informática
    quantidade: 100,
    criadorId: 1,
    fornecedorId: 1 // Tecnologia I
  },
  {
    descricao: 'Mouse Gamer Sem Fio',
    medidaId: 1, // Unidade
    precoCompra: 150.0,
    valorUn: 300.0,
    categoriaId: 15, // Informática
    quantidade: 150,
    criadorId: 1,
    fornecedorId: 1 // Distribuidora A
  },
  {
    descricao: 'Geladeira Duplex 450 Litros',
    medidaId: 1, // Unidade
    precoCompra: 2800.0,
    valorUn: 4800.0,
    categoriaId: 2, // Eletrodoméstico
    quantidade: 20,
    criadorId: 1,
    fornecedorId: 1 // Indústria E
  },
  {
    descricao: 'Máquina de Lavar Roupa 12kg',
    medidaId: 1, // Unidade
    precoCompra: 1800.0,
    valorUn: 3500.0,
    categoriaId: 2, // Eletrodoméstico
    quantidade: 30,
    criadorId: 1,
    fornecedorId: 1 // Fábrica C
  },
  {
    descricao: 'Forno Elétrico 40 Litros',
    medidaId: 1, // Unidade
    precoCompra: 500.0,
    valorUn: 900.0,
    categoriaId: 2, // Eletrodoméstico
    quantidade: 60,
    criadorId: 1,
    fornecedorId: 1 // Empresa G
  },
  {
    descricao: 'Micro-ondas 30 Litros',
    medidaId: 1, // Unidade
    precoCompra: 400.0,
    valorUn: 700.0,
    categoriaId: 2, // Eletrodoméstico
    quantidade: 80,
    criadorId: 1,
    fornecedorId: 1 // Comercial D
  },
  {
    descricao: 'Cama Box Casal',
    medidaId: 1, // Unidade
    precoCompra: 800.0,
    valorUn: 1500.0,
    categoriaId: 3, // Móveis
    quantidade: 15,
    criadorId: 1,
    fornecedorId: 1 // Construções L
  },
  {
    descricao: 'Sofá Retrátil 3 Lugares',
    medidaId: 1, // Unidade
    precoCompra: 1500.0,
    valorUn: 3000.0,
    categoriaId: 3, // Móveis
    quantidade: 10,
    criadorId: 1,
    fornecedorId: 1 // Magazine F
  },
  {
    descricao: 'Mesa de Jantar 4 Cadeiras',
    medidaId: 1, // Unidade
    precoCompra: 600.0,
    valorUn: 1200.0,
    categoriaId: 3, // Móveis
    quantidade: 25,
    criadorId: 1,
    fornecedorId: 1 // Indústria M
  },
  {
    descricao: 'Cadeira de Escritório',
    medidaId: 1, // Unidade
    precoCompra: 200.0,
    valorUn: 400.0,
    categoriaId: 3, // Móveis
    quantidade: 50,
    criadorId: 1,
    fornecedorId: 1 // Loja H
  },
  {
    descricao: 'Camiseta Algodão',
    medidaId: 1, // Unidade
    precoCompra: 20.0,
    valorUn: 40.0,
    categoriaId: 4, // Roupas
    quantidade: 200,
    criadorId: 1,
    fornecedorId: 1 // Comércio O
  },
  {
    descricao: 'Calça Jeans Masculina',
    medidaId: 1, // Unidade
    precoCompra: 50.0,
    valorUn: 100.0,
    categoriaId: 4, // Roupas
    quantidade: 150,
    criadorId: 1,
    fornecedorId: 1 // Agência N
  },
  {
    descricao: 'Vestido Floral',
    medidaId: 1, // Unidade
    precoCompra: 40.0,
    valorUn: 80.0,
    categoriaId: 4, // Roupas
    quantidade: 100,
    criadorId: 1,
    fornecedorId: 1 // Indústria M
  },
  {
    descricao: 'Tênis Esportivo',
    medidaId: 1, // Unidade
    precoCompra: 80.0,
    valorUn: 150.0,
    categoriaId: 4, // Roupas
    quantidade: 120,
    criadorId: 1,
    fornecedorId: 1 // Solução K
  },
  {
    descricao: 'Arroz Branco 5kg',
    medidaId: 2, // Kg
    precoCompra: 20.0,
    valorUn: 40.0,
    categoriaId: 5, // Alimentos
    quantidade: 500,
    criadorId: 1,
    fornecedorId: 1 // Serviços P
  },
  {
    descricao: 'Feijão Carioca 1kg',
    medidaId: 2, // Kg
    precoCompra: 15.0,
    valorUn: 30.0,
    categoriaId: 5, // Alimentos
    quantidade: 400,
    criadorId: 1,
    fornecedorId: 1 // Empresa Q
  },
  {
    descricao: 'Macarrão Espaguete 500g',
    medidaId: 2, // Kg
    precoCompra: 10.0,
    valorUn: 20.0,
    categoriaId: 5, // Alimentos
    quantidade: 300,
    criadorId: 1,
    fornecedorId: 1 // Logística R
  },
  {
    descricao: 'Refrigerante Lata 350ml',
    medidaId: 3, // Litro
    precoCompra: 4.0,
    valorUn: 8.0,
    categoriaId: 6, // Bebidas
    quantidade: 1000,
    criadorId: 1,
    fornecedorId: 1 // Tecnologia S
  },
  {
    descricao: 'Suco de Laranja 1 Litro',
    medidaId: 3, // Litro
    precoCompra: 7.0,
    valorUn: 12.0,
    categoriaId: 6, // Bebidas
    quantidade: 800,
    criadorId: 1,
    fornecedorId: 1 // Distribuidora A
  },
  {
    descricao: 'Cerveja Long Neck',
    medidaId: 1, // Unidade
    precoCompra: 5.0,
    valorUn: 10.0,
    categoriaId: 6, // Bebidas
    quantidade: 1500,
    criadorId: 1,
    fornecedorId: 1 // Distribuidora B
  },
];

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

async function main() {
  for (const usuario of usuarios) {
    const senhaHash = await bcrypt.hash(usuario.senha, 10);

    await prisma.usuario.create({
      data: {
        nome: usuario.nome,
        email: usuario.email,
        senha: senhaHash,
        role: usuario.role,
      },
    });
  }

  for (const categoria of categorias) {
    await prisma.categoria.create({ data: categoria });
  }

  for (const medida of medidas) {
    await prisma.medida.create({ data: medida });
  }


  for (const produto of produtos) {
    await prisma.produto.create({ data: produto });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
