import { Test, TestingModule } from '@nestjs/testing';
import { CatadorController } from './catador.controller';
import { CatadorService } from './catador.service';

describe('CatadorController', () => {
  let controller: CatadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatadorController],
      providers: [CatadorService],
    }).compile();

    controller = module.get<CatadorController>(CatadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
