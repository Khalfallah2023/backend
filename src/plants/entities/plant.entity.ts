// src/plants/entities/plant.entity.ts
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlantMetric } from '../../plant-metrics/entities/plant-mertic.entity';

@Entity()
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  backgroundColor: string;

  @Column()
  color: string;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  plantingDate: Date;

  @Column({ nullable: true })
  expectedHarvest: Date;

  @Column({ default: 'Every 2 days' })
  wateringSchedule: string;

  @Column({ nullable: true })
  lastWatered: Date;

  @Column({ default: 'Phase 1: Seedling' })
  growthPhase: string;

  @Column({ default: 0 })
  growthProgress: number;

  @OneToMany(() => PlantMetric, metric => metric.plant)
  metrics: PlantMetric[];
}