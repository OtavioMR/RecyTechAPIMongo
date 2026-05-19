import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async loginUsuario(createAuthDto: CreateAuthDto) {
    const { email, senha } = createAuthDto;

    const dadosUsuario = await this.usuarioService.findByEmail(email);

    if (!dadosUsuario) {
      throw new UnauthorizedException('E-mail ou senha incorretos.');
    }

    const senhaValida = await bcrypt.compare(senha, dadosUsuario.senha);

    if (!senhaValida) {
      throw new UnauthorizedException('E-mail ou senha incorretos.');
    }

    const payload = { 
      sub: dadosUsuario._id, 
      email: dadosUsuario.email,
      nome: dadosUsuario.nome 
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}