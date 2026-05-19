import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import { UsuariosModule } from './cidadao/usuarios.module';
import { CatadorModule } from './catador/catador.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/RecyTech'), UsuariosModule, CatadorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
