import { Test, TestingModule } from '@nestjs/testing';
import { ResellerController } from './reseller.controller';
import { ResellerService } from './reseller.service';

describe('ResellerController', () => {
  let controller: ResellerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResellerController],
      providers: [ResellerService],
    }).compile();

    controller = module.get<ResellerController>(ResellerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
