import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

enum Role {
  Admin = 'Admin',
  User = 'User',
  Storage = 'Storage',
}

async function main() {
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
    { descricao: 'Eletrônico' },
    { descricao: 'Eletrodoméstico' },
    { descricao: 'Móveis' },
    { descricao: 'Roupas' },
    { descricao: 'Alimentos' },
    { descricao: 'Bebidas' },
    { descricao: 'Brinquedos' },
    { descricao: 'Ferramentas' },
    { descricao: 'Automotivo' },
    { descricao: 'Esportes' },
    { descricao: 'Jardinagem' },
    { descricao: 'Papelaria' },
    { descricao: 'Saúde e Beleza' },
    { descricao: 'Informática' },
    { descricao: 'Livros' },
    { descricao: 'Música' },
    { descricao: 'Cinema e TV' },
    { descricao: 'Pet Shop' },
    { descricao: 'Construção' },
    { descricao: 'Moda' },
  ];

  const medidas = [
    { descricao: 'Unidade' },
    { descricao: 'Kg' },
    { descricao: 'Litro' },
    { descricao: 'Pacote' },
  ];

  const fornecedores = [
    {
      nome: 'Distribuidora B',
      cnpj: '55.666.777/0001-88',
      telefone: '11988887777',
      email: 'vendas@distribuidorab.com',
    },
    {
      nome: 'Fornecedor X',
      cnpj: '11.223.334/0001-99',
      telefone: '11999998888',
      email: 'contato@fornecedorx.com',
    },
    {
      nome: 'Comércio Y',
      cnpj: '44.555.666/0001-77',
      telefone: '11911112222',
      email: 'suporte@comercioy.com',
    },
    {
      nome: 'ABC Produtos',
      cnpj: '33.444.555/0001-66',
      telefone: '11933334444',
      email: 'contato@abcprodutos.com',
    },
    {
      nome: 'Inova Distribuidora',
      cnpj: '22.333.444/0001-55',
      telefone: '11922223333',
      email: 'vendas@inovadistribuidora.com',
    },
    {
      nome: 'Tech Supplies',
      cnpj: '11.111.222/0001-44',
      telefone: '11911112223',
      email: 'info@techsupplies.com',
    },
    {
      nome: 'Mercado Global',
      cnpj: '66.777.888/0001-33',
      telefone: '11966667777',
      email: 'contato@mercadoglobal.com',
    },
    {
      nome: 'Eco Fornecedores',
      cnpj: '55.666.777/0001-22',
      telefone: '11955556666',
      email: 'atendimento@ecofornecedores.com',
    },
    {
      nome: 'Distribuidora Express',
      cnpj: '44.555.666/0001-11',
      telefone: '11944445555',
      email: 'suporte@distribuidoraexpress.com',
    },
    {
      nome: 'Prime Produtos',
      cnpj: '77.888.999/0001-00',
      telefone: '11977778888',
      email: 'contato@primeprodutos.com',
    },
    {
      nome: 'Comercial Delta',
      cnpj: '22.333.444/0001-99',
      telefone: '11922224444',
      email: 'vendas@comercialdelta.com',
    },
    {
      nome: 'Global Suprimentos',
      cnpj: '11.222.333/0001-88',
      telefone: '11911113333',
      email: 'info@globalsuprimentos.com',
    },
    {
      nome: 'Tech Distribuição',
      cnpj: '33.444.555/0001-77',
      telefone: '11933335555',
      email: 'contato@techdistribuicao.com',
    },
  ];

  const produtos = [
    {
      descricao: 'Monitor',
      precoCompra: 1500.0,
      valorUn: 4000.0,
      quantidade: 10,
      categoria: 'Eletrônico',
      medida: 'Unidade',
      fornecedor: 'Distribuidora B',
    },
    {
      descricao: 'Teclado Mecânico',
      precoCompra: 250.0,
      valorUn: 600.0,
      quantidade: 15,
      categoria: 'Informática',
      medida: 'Unidade',
      fornecedor: 'Fornecedor X',
    },
    {
      descricao: 'Notebook',
      precoCompra: 3000.0,
      valorUn: 5000.0,
      quantidade: 8,
      categoria: 'Eletrônico',
      medida: 'Unidade',
      fornecedor: 'Comércio Y',
    },
    {
      descricao: 'Mesa Escritório',
      precoCompra: 200.0,
      valorUn: 800.0,
      quantidade: 12,
      categoria: 'Móveis',
      medida: 'Unidade',
      fornecedor: 'ABC Produtos',
    },
    {
      descricao: 'Cadeira Gamer',
      precoCompra: 500.0,
      valorUn: 1500.0,
      quantidade: 7,
      categoria: 'Móveis',
      medida: 'Unidade',
      fornecedor: 'Inova Distribuidora',
    },
    {
      descricao: 'Smartphone',
      precoCompra: 1000.0,
      valorUn: 3000.0,
      quantidade: 20,
      categoria: 'Eletrônico',
      medida: 'Unidade',
      fornecedor: 'Tech Supplies',
    },
    {
      descricao: 'Impressora',
      precoCompra: 400.0,
      valorUn: 1200.0,
      quantidade: 5,
      categoria: 'Informática',
      medida: 'Unidade',
      fornecedor: 'Mercado Global',
    },
    {
      descricao: 'Router Wi-Fi',
      precoCompra: 100.0,
      valorUn: 350.0,
      quantidade: 25,
      categoria: 'Informática',
      medida: 'Unidade',
      fornecedor: 'Eco Fornecedores',
    },
    {
      descricao: 'Fone de Ouvido',
      precoCompra: 50.0,
      valorUn: 150.0,
      quantidade: 30,
      categoria: 'Eletrônico',
      medida: 'Unidade',
      fornecedor: 'Distribuidora Express',
    },
    {
      descricao: 'Monitor 4K',
      precoCompra: 2000.0,
      valorUn: 4500.0,
      quantidade: 6,
      categoria: 'Eletrônico',
      medida: 'Unidade',
      fornecedor: 'Prime Produtos',
    },
  ];

  const clientes = [
    {
      nome: 'Maria Souza',
      cnpjCpf: '987.654.321-09',
      endereco: 'Avenida B, 456',
      telefone: '11888888888',
      email: 'maria.souza@example.com',
    },
    {
      nome: 'João Almeida',
      cnpjCpf: '123.456.789-01',
      endereco: 'Rua C, 789',
      telefone: '11999999999',
      email: 'joao.almeida@example.com',
    },
    {
      nome: 'Empresa X',
      cnpjCpf: '11.222.333/0001-44',
      endereco: 'Avenida Y, 123',
      telefone: '1144445555',
      email: 'contato@empresaX.com',
    },
    {
      nome: 'Ana Silva',
      cnpjCpf: '987.654.321-00',
      endereco: 'Rua D, 321',
      telefone: '1133334444',
      email: 'ana.silva@example.com',
    },
    {
      nome: 'Carlos Pereira',
      cnpjCpf: '111.222.333-44',
      endereco: 'Rua E, 567',
      telefone: '1122223333',
      email: 'carlos.pereira@example.com',
    },
    {
      nome: 'Empresa Y',
      cnpjCpf: '22.333.444/0001-55',
      endereco: 'Avenida Z, 456',
      telefone: '1155556666',
      email: 'contato@empresaY.com',
    },
    {
      nome: 'Fernanda Lima',
      cnpjCpf: '123.987.654-32',
      endereco: 'Rua F, 789',
      telefone: '1166667777',
      email: 'fernanda.lima@example.com',
    },
    {
      nome: 'Roberto Costa',
      cnpjCpf: '987.321.654-09',
      endereco: 'Avenida G, 890',
      telefone: '1177778888',
      email: 'roberto.costa@example.com',
    },
    {
      nome: 'Empresa Z',
      cnpjCpf: '33.444.555/0001-66',
      endereco: 'Rua H, 123',
      telefone: '1188889999',
      email: 'contato@empresaZ.com',
    },
    {
      nome: 'Beatriz Fernandes',
      cnpjCpf: '999.888.777-66',
      endereco: 'Avenida I, 321',
      telefone: '1199991111',
      email: 'beatriz.fernandes@example.com',
    },
  ];

  // Tipos de usuários

  // 1. Criar os usuários
  for (const usuario of usuarios) {
    const existingUser = await prisma.usuario.findUnique({
      where: { email: usuario.email },
    });

    if (!existingUser) {
      const senhaHash = await bcrypt.hash(usuario.senha, 10);

      await prisma.usuario.create({
        data: {
          nome: usuario.nome,
          email: usuario.email,
          senha: senhaHash,
          role: usuario.role,
        },
      });
    } else {
      console.log(`Usuário com email ${usuario.email} já existe.`);
    }
  }

  const adminUsers = await prisma.usuario.findMany({
    where: {
      role: Role.Admin,
    },
  });

  if (adminUsers.length === 0) {
    console.log('Nenhum usuário com a role ADMIN encontrado.');
    return;
  }

  const storageUsers = await prisma.usuario.findMany({
    where: {
      role: Role.Storage,
    },
  });

  if (storageUsers.length === 0) {
    console.log('Nenhum usuário com a role STORAGE encontrado.');
    return;
  }

  const commomUsers = await prisma.usuario.findMany({
    where: {
      role: Role.User,
    },
  });

  if (commomUsers.length === 0) {
    console.log('Nenhum usuário com a role USER encontrado.');
    return;
  }

  // 2. Criar as categorias
  const categoriasMap = new Map();

  for (const categoria of categorias) {
    const randomUser =
      storageUsers[Math.floor(Math.random() * storageUsers.length)];

    const createdCategoria = await prisma.categoria.create({
      data: {
        descricao: categoria.descricao,
        criadorId: randomUser.id,
      },
    });

    categoriasMap.set(categoria.descricao, createdCategoria.id);
  }

  // 4. Criar as medidas
  const medidasMap = new Map();

  for (const medida of medidas) {
    const createdMedida = await prisma.medida.create({
      data: {
        descricao: medida.descricao,
      },
    });

    medidasMap.set(medida.descricao, createdMedida.id);
  }

  // 5. Criar os fornecedores
  const fornecedoresMap = new Map();

  for (const fornecedor of fornecedores) {
    const randomUser =
      commomUsers[Math.floor(Math.random() * commomUsers.length)];

    const createdFornecedor = await prisma.fornecedor.create({
      data: {
        nome: fornecedor.nome,
        cnpj: fornecedor.cnpj,
        telefone: fornecedor.telefone,
        email: fornecedor.email,
        criadorId: randomUser.id,
        atualizadoEm: new Date(),
      },
    });

    fornecedoresMap.set(fornecedor.nome, createdFornecedor.id);
  }

  // 6. Criar os produtos
  for (const produto of produtos) {
    const categoriaId = categoriasMap.get(produto.categoria);
    const fornecedorId = fornecedoresMap.get(produto.fornecedor);
    const medidaId = medidasMap.get(produto.medida);
    const randomUser =
      commomUsers[Math.floor(Math.random() * commomUsers.length)];

    await prisma.produto.create({
      data: {
        descricao: produto.descricao,
        medidaId: medidaId,
        precoCompra: produto.precoCompra,
        valorUn: produto.valorUn,
        quantidade: produto.quantidade,
        criadorId: randomUser.id,
        fornecedorId: fornecedorId,
        atualizadoEm: new Date(),
      },
    });
  }

  for (const cliente of clientes) {
    const randomUser =
      adminUsers[Math.floor(Math.random() * adminUsers.length)];

    const existingCliente = await prisma.cliente.findUnique({
      where: { email: cliente.email },
    });

    if (!existingCliente) {
      await prisma.cliente.create({
        data: {
          nome: cliente.nome,
          cnpjCpf: cliente.cnpjCpf,
          endereco: cliente.endereco,
          telefone: cliente.telefone,
          email: cliente.email,
          criadorId: randomUser.id,
        },
      });
    }
  }

  console.log(
    'Usuários, categorias, medidas, fornecedores, produtos e clientes criados com sucesso!',
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
