import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ClienteModule } from './cliente/cliente.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { MProdutoPedidoModule } from './item_pedido/item_pedido.module';
import { MedidaModule } from './medida/medida.module';
import { MovimentacaoEstoqueModule } from './movimentacao_estoque/movimentacao_estoque.module';
import { PedidoModule } from './pedido/pedido.module';
import { UsuarioModule } from './usuario/usuario.module';
import { FormatCpfCnpjInterceptor } from './utils/cpf_cnpj_format.interceptor';
import { DateFormattingInterceptor } from './utils/date_format.interceptor';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [
    FornecedorModule,
    CategoriaModule,
    UsuarioModule,
    PedidoModule,
    ClienteModule,
    MProdutoPedidoModule,
    MovimentacaoEstoqueModule,
    MedidaModule,
    AuthModule,
    ProdutoModule,
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
