import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plant } from './entities/plant.entity';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';

@Injectable()
export class PlantsService {
  constructor(
    @InjectRepository(Plant)
    private plantsRepository: Repository<Plant>,
  ) {}

  async create(createPlantDto: CreatePlantDto): Promise<Plant> {
    const plant = this.plantsRepository.create(createPlantDto);
    // L'ID sera généré automatiquement par la méthode @BeforeInsert
    return this.plantsRepository.save(plant);
  }

  async findAll(): Promise<Plant[]> {
    try {
      return await this.plantsRepository.find();
    } catch (error) {
      console.error('Error fetching plants:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Plant> {
    const plant = await this.plantsRepository.findOne({ 
      where: { id },
      relations: ['metrics'] 
    });
    
    if (!plant) {
      throw new NotFoundException(`Plant with ID ${id} not found`);
    }
    
    return plant;
  }

  async update(id: string, updatePlantDto: UpdatePlantDto): Promise<Plant> {
    const plant = await this.findOne(id);
    
    // Mise à jour des propriétés
    Object.assign(plant, updatePlantDto);
    
    return this.plantsRepository.save(plant);
  }

  async remove(id: string): Promise<void> {
    const result = await this.plantsRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Plant with ID ${id} not found`);
    }
  }
 
  async getPlantUsers(plantId: string) {
    const plant = await this.plantsRepository.findOne({
      where: { id: plantId },
      relations: ['userPlants', 'userPlants.user']
    });
    
    if (!plant) {
      throw new NotFoundException(`Plant with ID ${plantId} not found`);
    }
    
    return plant.userPlants.map(up => up.user);
  }
}