import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { PlantMetric } from './entities/plant-metric.entity';
import { Plant } from '../plants/entities/plant.entity';

@Injectable()
export class PlantMetricsService {
  constructor(
    @InjectRepository(PlantMetric)
    private plantMetricsRepository: Repository<PlantMetric>,
    @InjectRepository(Plant)
    private plantsRepository: Repository<Plant>,
  ) {}

  // Get current metrics (most recent reading) for a specific plant
  async getCurrentMetrics(plantId: string): Promise<PlantMetric> {
    const metrics = await this.plantMetricsRepository.find({
      where: { plant: { id: plantId } },
      order: { timestamp: 'DESC' },
      take: 1,
      relations: ['plant'],
    });

    if (metrics.length === 0) {
      throw new NotFoundException(`No metrics found for plant with ID ${plantId}`);
    }

    return metrics[0];
  }

  // Get historical metrics for a specific plant
  async getHistoricalMetrics(plantId: string, months: number = 7): Promise<PlantMetric[]> {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    // Use TypeORM's MoreThanOrEqual instead of $gte
    const metrics = await this.plantMetricsRepository.find({
      where: { 
        plant: { id: plantId },
        timestamp: MoreThanOrEqual(startDate)
      },
      order: { timestamp: 'ASC' },
      relations: ['plant'],
    });

    if (metrics.length === 0) {
      throw new NotFoundException(`No historical metrics found for plant with ID ${plantId}`);
    }

    return metrics;
  }

  // Get a single plant with its latest metrics
  async getPlantWithMetrics(plantId: string) {
    const plant = await this.plantsRepository.findOne({
      where: { id: plantId },
    });

    if (!plant) {
      throw new NotFoundException(`Plant with ID ${plantId} not found`);
    }

    // Get current metrics
    let currentMetrics;
    try {
      currentMetrics = await this.getCurrentMetrics(plantId);
    } catch (error) {
      // If no metrics found, create default metrics
      currentMetrics = {
        ph: 6.2,
        temperature: 24,
        humidity: 65,
        nitrogen: 65,
        potassium: 82,
        calcium: 70,
        phosphorus: 55,
        pressure: '1013 hPa',
        airQuality: 'Good',
        windSpeed: '5 km/h',
      };
    }

    // Get historical data
    let historicalData: {
      temperatureHistory: number[];
      phHistory: number[];
      humidityHistory: number[];
      labels: string[];
    };

    try {
      const historicalMetrics = await this.getHistoricalMetrics(plantId);
      
      // Process and format historical data
      historicalData = {
        temperatureHistory: historicalMetrics.map(metric => metric.temperature),
        phHistory: historicalMetrics.map(metric => metric.ph),
        humidityHistory: historicalMetrics.map(metric => metric.humidity),
        // Format dates for labels
        labels: historicalMetrics.map(metric => {
          const date = new Date(metric.timestamp);
          return date.toLocaleString('default', { month: 'short' });
        }),
      };
    } catch (error) {
      // Default historical data if none found
      historicalData = {
        temperatureHistory: [22, 23, 24, 25, 24, 23, 24],
        phHistory: [6.0, 6.1, 6.3, 6.2, 6.4, 6.2, 6.3],
        humidityHistory: [60, 62, 65, 68, 64, 63, 65],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      };
    }

    return {
      plant,
      currentMetrics,
      historicalData,
    };
  }

  // Add a new metric reading for a plant
  async addMetricReading(plantId: string, metricData: Partial<PlantMetric>): Promise<PlantMetric> {
    const plant = await this.plantsRepository.findOne({
      where: { id: plantId },
    });

    if (!plant) {
      throw new NotFoundException(`Plant with ID ${plantId} not found`);
    }

    const newMetric = this.plantMetricsRepository.create({
      ...metricData,
      plant,
    });

    return this.plantMetricsRepository.save(newMetric);
  }
}