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

  
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}