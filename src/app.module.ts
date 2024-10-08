import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { CategoriaModule } from './categoria/categoria.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto/produto.module';
import { PedidoModule } from './pedido/pedido.module';
import { ClienteModule } from './cliente/cliente.module';

@Module({
  imports: [FornecedorModule, CategoriaModule, UsuarioModule, ProdutoModule, PedidoModule, ClienteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
