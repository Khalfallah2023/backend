import { Test, TestingModule } from '@nestjs/testing';
import { PlantMetricsController } from './plant-metrics.controller';

describe('PlantMetricsController', () => {
  let controller: PlantMetricsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantMetricsController],
    }).compile();

    controller = module.get<PlantMetricsController>(PlantMetricsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
