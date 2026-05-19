// update-catador.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCatadorDto } from './create-catador.dto';
import { TipoVeiculoEnum } from '../mapping/veiculosCatador'; // Ajuste o caminho se necessário

// O PartialType já herda automaticamente: nome?, email?, senha?
export class UpdateCatadorDto extends PartialType(CreateCatadorDto) {
    cpf?: string;
    telefone?: string;
    
    // Mudamos para 'tipoVeiculo' para ficar claro o que o front está enviando,
    // e tipamos com o Enum para garantir que só aceite os códigos válidos!
    tipoVeiculo?: TipoVeiculoEnum; 
}