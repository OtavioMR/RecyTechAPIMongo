import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    name?: string;
    email?: string;
    senha?: string;
    cpf?: string;
    telefone?: string;
}
