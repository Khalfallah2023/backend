import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn ,Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Plant } from '../../plants/entities/plant.entity';

@Entity()
export class UserPlant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.userPlant, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Plant, plant => plant.userPlants,  { eager: true })
  plant: Plant;

  @CreateDateColumn()
  addedAt: Date;

  @Column({ type: 'integer', nullable: false, default: 0 })
  quantity:number;

  @Column({ name: 'plantingdate', nullable: true })
  plantingDate: string;

}