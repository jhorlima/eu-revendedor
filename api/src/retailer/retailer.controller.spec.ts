import { Test, TestingModule } from '@nestjs/testing';
import { RetailerController } from './retailer.controller';
import { RetailerService } from './retailer.service';

describe('RetailerController', () => {
  let controller: RetailerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RetailerController],
      providers: [RetailerService],
    }).compile();

    controller = module.get<RetailerController>(RetailerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
