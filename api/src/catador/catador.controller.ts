import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatadorService } from './catador.service';
import { CreateCatadorDto } from './dto/create-catador.dto';
import { UpdateCatadorDto } from './dto/update-catador.dto';

@Controller('catador')
export class CatadorController {
  constructor(private readonly catadorService: CatadorService) {}

  @Post('cadastrar')
  create(@Body() createCatadorDto: CreateCatadorDto) {
    return this.catadorService.create(createCatadorDto);
  }

  @Get()
  findAll() {
    return this.catadorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catadorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatadorDto: UpdateCatadorDto) {
    return this.catadorService.update(id, updateCatadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catadorService.remove(+id);
  }
}
