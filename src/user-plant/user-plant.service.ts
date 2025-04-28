import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPlant } from './entities/user-plant.entity';
import { User } from '../users/entities/user.entity';
import { Plant } from '../plants/entities/plant.entity';

@Injectable()
export class UserPlantService {
  constructor(
    @InjectRepository(UserPlant)
    private userPlantRepository: Repository<UserPlant>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Plant)
    private plantRepository: Repository<Plant>,
  ) {}

  async addPlantToUser(userId: string, plantId: string, quantity: number, plantingDate: string): Promise<UserPlant> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const plant = await this.plantRepository.findOne({ where: { id: plantId } });
    if (!plant) {
      throw new NotFoundException(`Plant with ID ${plantId} not found`);
    }

    const userPlant = this.userPlantRepository.create({
      user,
      plant,
      quantity,
      plantingDate,
      
    });

    return this.userPlantRepository.save(userPlant);
  }

  async getUserPlants(userId: string): Promise<UserPlant[]> {
    const userPlants = await this.userPlantRepository.find({
      where: { user: { id: userId } },
      relations: ['plant'],
    });
  
    // Modifier dynamiquement la quantité du plant par celle du userPlant
    return userPlants.map(userPlant => {
      if (userPlant.plant) {
        userPlant.plant.quantity = userPlant.quantity;
      }
      return userPlant;
    });
  }
  
  async removePlantFromUser(userId: string, plantId: string): Promise<void> {
    const userPlant = await this.userPlantRepository.findOne({
      where: {
        user: { id: userId },
        plant: { id: plantId },
      },
    });

    if (!userPlant) {
      throw new NotFoundException(`Plant with ID ${plantId} not found for user with ID ${userId}`);
    }

    await this.userPlantRepository.remove(userPlant);
  }
}