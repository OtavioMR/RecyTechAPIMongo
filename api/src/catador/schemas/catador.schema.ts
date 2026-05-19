import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TipoVeiculoEnum, TraducaoVeiculo } from "../mapping/veiculosCatador";

export type CatadorDocument = HydratedDocument<Catador>;

@Schema({ _id: false })
export class Veiculo {
    @Prop({ required: true, type: Number })
    codigo!: TipoVeiculoEnum;

    @Prop({ required: true })
    nome!: string;
}
const veiculoSchema = SchemaFactory.createForClass(Veiculo);

@Schema({ _id: false })
export class DadosCatador {
    @Prop({ unique: true, sparse: true })
    cpf?: string;

    @Prop({ required: true })
    telefone?: string;

    @Prop({ type: veiculoSchema, required: true })
    veiculo!: Veiculo;
}

const DadosCatadorSchema = SchemaFactory.createForClass(DadosCatador);

@Schema({ timestamps: true })
export class Catador {
    // O Mongoose já injeta a propriedade _id automaticamente aqui nos bastidores

    @Prop({ required: true })
    nome!: string;

    @Prop({ required: true, unique: true })
    email!: string;

    @Prop({ required: true })
    senha!: string;

    @Prop({ type: DadosCatadorSchema, required: false }) // Boa prática apontar para o Schema gerado
    dadosCatador?: DadosCatador;
}

export const CatadorSchema = SchemaFactory.createForClass(Catador);

// ========================================================
// A MÁGICA ACONTECE AQUI: Middleware Pre-Save do Mongoose
// ========================================================

// Tipando o método como 'any' removemos a validação teimosa do overload do Mongoose
(CatadorSchema.pre as any)('save', function (this: CatadorDocument, next: any) {

    if (this.dadosCatador?.veiculo?.codigo) {
        const codigo = this.dadosCatador.veiculo.codigo;

        // O autocomplete continua funcionando perfeitamente aqui dentro!
        this.dadosCatador.veiculo.nome = TraducaoVeiculo[codigo] || "Desconhecido";
    }
});