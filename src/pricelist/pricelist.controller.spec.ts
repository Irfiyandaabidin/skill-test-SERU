import { Test, TestingModule } from '@nestjs/testing';
import { PricelistController } from './pricelist.controller';

describe('PricelistController', () => {
  let controller: PricelistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PricelistController],
    }).compile();

    controller = module.get<PricelistController>(PricelistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
