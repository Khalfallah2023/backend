import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Plant } from '../../plants/entities/plant.entity';

@Entity()
export class PlantMetric {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Plant, plant => plant.metrics, { onDelete: 'CASCADE' })
  plant: Plant;

  @CreateDateColumn()
  timestamp: Date;

  @Column('float', { nullable: true })
  ph: number;

  @Column('float', { nullable: true })
  temperature: number;

  @Column('float', { nullable: true })
  humidity: number;

  @Column('float', { nullable: true })
  nitrogen: number;

  @Column('float', { nullable: true })
  potassium: number;

  @Column('float', { nullable: true })
  calcium: number;

  @Column('float', { nullable: true })
  phosphorus: number;

  @Column({ nullable: true })
  pressure: string;

  @Column({ nullable: true })
  airQuality: string;

  @Column({ nullable: true })
  windSpeed: string;
}