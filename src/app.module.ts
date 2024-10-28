import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { CategoriaModule } from './categoria/categoria.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto/produto.module';
import { PedidoModule } from './pedido/pedido.module';
import { ClienteModule } from './cliente/cliente.module';
import { MProdutoPedidoModule } from './item_pedido/item_pedido.module';
import { ProdutoFornecedorModule } from './produto_fornecedor/produto_fornecedor.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { FormatCpfCnpjInterceptor } from './utils/cpf_cnpj_format.interceptor';
import { MovimentacaoEstoqueModule } from './movimentacao_estoque/movimentacao_estoque.module';
import { DateFormattingInterceptor } from './utils/date_format.interceptor';
import { MedidaModule } from './medida/medida.module';
import { AuthModule } from './auth/auth.module';

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
    MovimentacaoEstoqueModule,
    MedidaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: FormatCpfCnpjInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: DateFormattingInterceptor,
    },
  ],
})
export class AppModule {}
