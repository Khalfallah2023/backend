import { Module } from '@nestjs/common';
import { PlantMetricsController } from './plant-metrics.controller';
import { PlantMetricsService } from './plant-metrics.service';

@Module({
  controllers: [PlantMetricsController],
  providers: [PlantMetricsService]
})
export class PlantMetricsModule {}
