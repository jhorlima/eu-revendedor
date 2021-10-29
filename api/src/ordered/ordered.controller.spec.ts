import { Test, TestingModule } from '@nestjs/testing';
import { OrderedController } from './ordered.controller';
import { OrderedService } from './ordered.service';

describe('OrderedController', () => {
  let controller: OrderedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderedController],
      providers: [OrderedService],
    }).compile();

    controller = module.get<OrderedController>(OrderedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
