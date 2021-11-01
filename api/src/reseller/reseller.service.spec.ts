import { Test, TestingModule } from '@nestjs/testing';
import { ResellerService } from './reseller.service';

describe('ResellerService', () => {
  let service: ResellerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResellerService],
    }).compile();

    service = module.get<ResellerService>(ResellerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
