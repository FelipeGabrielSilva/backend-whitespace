import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
    private usuario: UsuarioService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log('Body:', loginDto);

    const user = await this.authService.validateUsuario(
      loginDto.email,
      loginDto.senha,
    );

    if (!user) {
      throw new UnauthorizedException('Credênciais Inválidas.');
    }

    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('usuario/logado')
  async getUsuarioLogado(@Request() req) {
    return this.authService.getUsuarioLogado(
      req.headers.authorization.split(' ')[1],
    );
  }
}
