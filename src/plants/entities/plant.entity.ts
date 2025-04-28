import { Column, Entity, OneToMany, PrimaryColumn, BeforeInsert } from 'typeorm';
import { PlantMetric } from '../../plant-metrics/entities/plant-metric.entity';
import { UserPlant } from '../../user-plant/entities/user-plant.entity';

@Entity()
export class Plant {
  @PrimaryColumn()
  id: string; // Changé de number à string pour accueillir le format date+nom

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  color: string;

  @Column()
  quantity: number;
  @Column()
backgroundColor: string;

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

  @OneToMany(() => UserPlant, userPlant => userPlant.plant)
  userPlants: UserPlant[];

  @OneToMany(() => PlantMetric, metric => metric.plant)
  metrics: PlantMetric[];

  // Méthode pour générer automatiquement l'ID basé sur la date et le nom
  @BeforeInsert()
  generateId() {
    if (this.plantingDate) {
      const dateStr = this.plantingDate.toISOString().split('T')[0].replace(/-/g, '');
      const namePart = this.title.toLowerCase().replace(/\s+/g, '-').substring(0, 20);
      this.id = `${dateStr}-${namePart}`;
    } else {
      // Si pas de date de plantation, utiliser la date actuelle
      const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, '');
      const namePart = this.title.toLowerCase().replace(/\s+/g, '-').substring(0, 20);
      this.id = `${currentDate}-${namePart}`;
    }
  }
}