import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema()
export class Usuario {
    @Prop({required: true})
    nome!: string;

    @Prop({required: true, unique: true})
    email!: string;

    @Prop({required: true})
    senha!: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);