import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { CategoriaModule } from './categoria/categoria.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto/produto.module';
import { PedidoModule } from './pedido/pedido.module';
import { ClienteModule } from './cliente/cliente.module';
import { MProdutoPedidoModule } from './m_produto_pedido/m_produto_pedido.module';
import { ProdutoFornecedorModule } from './produto_fornecedor/produto_fornecedor.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { FormatCpfCnpjInterceptor } from './utils/cpf_cnpj_format.interceptor';

@Module({
  imports: [
    FornecedorModule,
    CategoriaModule,
    UsuarioModule,
    ProdutoModule,
    PedidoModule,
    ClienteModule,
    MProdutoPedidoModule,
    ProdutoFornecedorModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: FormatCpfCnpjInterceptor,
    },
  ],
})
export class AppModule {}
