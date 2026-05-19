import { Body, Controller, Post, HttpCode, HttpStatus, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from './auth.guard';
import { UsuariosService } from '../usuarios/usuarios.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuarioService: UsuariosService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.loginUsuario(createAuthDto);
  }

  // EXEMPLO: Uma rota protegida que só quem tem o JWT consegue acessar
  @UseGuards(AuthGuard)
  @Get('perfil')
  getProfile(@Request() req: any) {
    // Retorna os dados que o Guard embutiu na requisição (o payload do JWT)
    const usuarioId = req.usuario?.sub;
    return this.usuarioService.findOne(usuarioId);
  }
}