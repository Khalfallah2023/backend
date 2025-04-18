// src/plant-metrics/entities/plant-metric.entity.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Plant } from '../../plants/entities/plant.entity';

export enum MetricType {
  TEMPERATURE = 'temperature',
  HUMIDITY = 'humidity',
  PH = 'ph',
  NITROGEN = 'nitrogen',
  POTASSIUM = 'potassium',
  CALCIUM = 'calcium',
  PHOSPHORUS = 'phosphorus',
}

@Entity()
export class PlantMetric {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: MetricType,
  })
  type: MetricType;

  @Column('float')
  value: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(() => Plant, plant => plant.metrics)
  plant: Plant;
}