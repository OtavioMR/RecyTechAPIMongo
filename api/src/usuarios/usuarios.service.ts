import { ConflictException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './schemas/usuario.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {

  constructor(@InjectModel(Usuario.name) private usuarioModel: Model<Usuario>) { }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const email = createUsuarioDto.email;

    const existe = await this.usuarioModel.findOne({ email }).exec();

    if (existe) {
      throw new ConflictException('Este email já está cadastrado!');
    }

    const salt = 10;
    const hashSenha = await bcrypt.hash(createUsuarioDto.senha, salt);
    const usuarioFinal = {
      ...createUsuarioDto,
      senha: hashSenha,
    };

    const usuario = new this.usuarioModel(usuarioFinal);
    return await usuario.save();

  }

  findAll() {
    return `This action returns all usuarios`;
  }

  async findOne(id: string) {
    // 1. Segurança: Evita buscar no banco se o ID vier nulo ou undefined
    if (!id) {
      throw new BadRequestException('O ID do usuário não foi fornecido.');
    }

    // 2. Corrigido: Buscando explicitamente pelo campo '_id' do MongoDB
    // O select('-senha') garante que o hash da senha nunca vaze no json de resposta
    const usuario = await this.usuarioModel.findOne({ _id: id }).select('-senha').exec();

    // 3. Se o ID for válido mas o usuário não existir mais no banco
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario | null> {
    return this.usuarioModel.findByIdAndUpdate(
      id,
      { $set: updateUsuarioDto },
      { returnDocument: 'after' }
    ).exec();
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }




  // Autenticação de usuário
  async findByEmail(email: string) {
    return this.usuarioModel.findOne({ email }).exec();
  }



}
