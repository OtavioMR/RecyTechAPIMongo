import { ConflictException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateCatadorDto } from './dto/create-catador.dto';
import { UpdateCatadorDto } from './dto/update-catador.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Catador } from './schemas/catador.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatadorService {

  constructor(@InjectModel(Catador.name) private catadorModel: Model<Catador>) { }

  async create(createCatadorDto: CreateCatadorDto) {
    const email = createCatadorDto.email;

    const existe = await this.catadorModel.findOne({ email }).exec();

    if (existe) {
      throw new ConflictException('Este email já está cadastrado!');
    }

    const senha = createCatadorDto.senha;

    const senhaHash = await bcrypt.hash(senha, 10);

    const catadorFinal = {
      ...createCatadorDto,
      senha: senhaHash
    }

    const catador = new this.catadorModel(catadorFinal);
    return await catador.save();

  }

  findAll() {
    return `This action returns all catador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catador`;
  }

  async update(id: string, updateCatadorDto: UpdateCatadorDto) {
    const catador = await this.catadorModel.findById(id);
    if (!catador) throw new NotFoundException('Catador não encontrado');

    // 1. Correção do nome: Se no seu DTO de criação está 'name', use 'name' aqui também!
    if (updateCatadorDto.nome) catador.nome = updateCatadorDto.nome;
    if (updateCatadorDto.email) catador.email = updateCatadorDto.email;
    if (updateCatadorDto.senha) catador.senha = updateCatadorDto.senha;

    // 2. Só entra para atualizar o perfil se pelo menos um dos campos foi enviado
    if (updateCatadorDto.cpf || updateCatadorDto.telefone || updateCatadorDto.tipoVeiculo) {

      // Descobre qual será o código final do veículo (o novo enviado ou o que já estava no banco)
      const codigoFinal = updateCatadorDto.tipoVeiculo ?? catador.dadosCatador?.veiculo?.codigo;

      // Solução para o erro 2322 (undefined): 
      // Garantimos que o código do veículo realmente existe antes de montar o objeto obrigatório
      if (!codigoFinal) {
        throw new BadRequestException('O código do veículo é obrigatório para registrar os dados do catador.');
      }

      catador.dadosCatador = {
        cpf: updateCatadorDto.cpf ?? catador.dadosCatador?.cpf,
        telefone: updateCatadorDto.telefone ?? catador.dadosCatador?.telefone,
        veiculo: {
          codigo: codigoFinal, // Agora o TS tem certeza absoluta de que não é 'undefined'
          nome: catador.dadosCatador?.veiculo?.nome ?? 'Pendente' // Evita o erro de undefined na string nome
        }
      };
    }

    // Salva no banco executando o nosso middleware pre-save
    return await catador.save();
  }

  remove(id: number) {
    return `This action removes a #${id} catador`;
  }
}
