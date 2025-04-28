import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PlantMetricsService } from './plant-metrics.service';
import { PlantMetric } from './entities/plant-metric.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('plant-metrics')
export class PlantMetricsController {
  constructor(private readonly plantMetricsService: PlantMetricsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':plantId/current')
  getCurrentMetrics(@Param('plantId') plantId: string) {
    return this.plantMetricsService.getCurrentMetrics(plantId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':plantId/history')
  getHistoricalMetrics(@Param('plantId') plantId: string) {
    return this.plantMetricsService.getHistoricalMetrics(plantId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':plantId/dashboard')
  getPlantWithMetrics(@Param('plantId') plantId: string) {
    return this.plantMetricsService.getPlantWithMetrics(plantId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':plantId')
  addMetricReading(
    @Param('plantId') plantId: string,
    @Body() metricData: Partial<PlantMetric>,
  ) {
    return this.plantMetricsService.addMetricReading(plantId, metricData);
  }
}