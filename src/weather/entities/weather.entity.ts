import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Weather {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location: string;

  @Column('float')
  temperature: number;

  @Column('integer')
  humidity: number;

  @Column('float')
  windSpeed: number;

  @Column({ default: '1013 hPa' })
  pressure: string;

  @Column({ default: 'Partly Cloudy' })
  condition: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}