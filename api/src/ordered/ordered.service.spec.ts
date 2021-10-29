import { Test, TestingModule } from '@nestjs/testing';
import { OrderedService } from './ordered.service';

describe('OrderedService', () => {
  let service: OrderedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderedService],
    }).compile();

    service = module.get<OrderedService>(OrderedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
