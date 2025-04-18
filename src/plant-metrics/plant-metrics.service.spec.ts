import { Test, TestingModule } from '@nestjs/testing';
import { PlantMetricsService } from './plant-metrics.service';

describe('PlantMetricsService', () => {
  let service: PlantMetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlantMetricsService],
    }).compile();

    service = module.get<PlantMetricsService>(PlantMetricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
