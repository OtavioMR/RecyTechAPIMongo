import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './schemas/usuario.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsuariosService {

  constructor(@InjectModel(Usuario.name) private usuarioModel: Model<Usuario>) { }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const email = createUsuarioDto.email;

    const existe = await this.usuarioModel.findOne({email}).exec();

    if(existe){
      throw new ConflictException('Este email já está cadastrado!');
    }

    const usuario = new this.usuarioModel(createUsuarioDto);
    return await usuario.save();
    
  }

  findAll() {
    return `This action returns all usuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
