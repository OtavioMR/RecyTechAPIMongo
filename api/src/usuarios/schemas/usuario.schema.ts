import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UsuarioDocument = HydratedDocument<Usuario>;

// 1. Aqui é criado a classe para os dados específicos do usuário (Subdocumento)
// O '_id: false' impede que o Mongo crie um ID para caa bloco de dados, já pertencente ao usuário

@Schema({_id: false})
export class DadosCidadao {
    @Prop({unique: true, sparse: true})
    cpf?: string;

    @Prop({required: true})
    telefone?: string;

    // Futuramente, quando precisar de mais dados (RG, Data de Nascimento, etc),
    // basta vir aqui e adicionar as propriedades abaixo:
    // @Prop()
    // rg?: string;
}

// Criamos o schema do subdocumento para o Mongoose entender
const DadosCidadaoSchema = SchemaFactory.createForClass(DadosCidadao);

// 2. Schema principal
@Schema({timestamps: true}) // Boa prática para ter createdAt e updatedAt automaticamente
export class Usuario {
    @Prop({required: true})
    nome!: string;

    @Prop({required: true, unique: true})
    email!: string;

    @Prop({required: true})
    senha!: string;

    // Embutimos os dados do cidadão aqui
    // Usamos o tipo DadosCidadaoSchema para a validação do Mongoose e a classe DadosCidadao para o TypeScript
    @Prop({type: DadosCidadao, required: false})
    dadosCidadao?: DadosCidadao;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);