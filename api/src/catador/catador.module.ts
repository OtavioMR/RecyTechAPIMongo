import { Module } from '@nestjs/common';
import { CatadorService } from './catador.service';
import { CatadorController } from './catador.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Catador, CatadorSchema } from './schemas/catador.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name: Catador.name, schema: CatadorSchema}])
  ],
  controllers: [CatadorController],
  providers: [CatadorService],
})
export class CatadorModule {}
