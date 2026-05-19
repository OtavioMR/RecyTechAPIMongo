import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token de autenticação não encontrado.');
    }

    try {
      // Valida o token usando a chave secreta
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET, // Em produção, use process.env.JWT_SECRET
      });
      
      // Insere os dados do usuário logado na requisição para usar nos controllers depois
      request['usuario'] = payload;
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado.');
    }
    
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}