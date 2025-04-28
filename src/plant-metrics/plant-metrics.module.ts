import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantMetricsController } from './plant-metrics.controller';
import { PlantMetricsService } from './plant-metrics.service';
import { PlantMetric } from './entities/plant-metric.entity';
import { Plant } from '../plants/entities/plant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlantMetric, Plant])
  ],
  controllers: [PlantMetricsController],
  providers: [PlantMetricsService],
  exports: [PlantMetricsService],
})
export class PlantMetricsModule {}