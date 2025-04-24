// src/plant-metrics/plant-metrics.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantMetric } from './entities/plant-metric.entity';
import { PlantMetricsController } from './plant-metrics.controller';
import { PlantMetricsService } from './plant-metrics.service';
import { PlantsModule } from '../plants/plants.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlantMetric]),
    PlantsModule,
  ],
  controllers: [PlantMetricsController],
  providers: [PlantMetricsService],
})
export class PlantMetricsModule {}