import { Controller, Post, Body, Request, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('login')
  async login(@Body() body: { email: string; senha: string }) {
    const user = await this.authService.validateUsuario(body.email, body.senha);

    if (!user) {
      throw new UnauthorizedException('Credênciais Inválidas.');
    }
    
    return this.authService.login(user);
  }
}
