import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPlantController } from './user-plant.controller';
import { UserPlantService } from './user-plant.service';
import { UserPlant } from './entities/user-plant.entity';
import { User } from '../users/entities/user.entity';
import { Plant } from '../plants/entities/plant.entity';


@Module({
  imports: [TypeOrmModule.forFeature([UserPlant, User, Plant])],
  controllers: [UserPlantController],
  providers: [UserPlantService],
  exports: [UserPlantService]
})
export class UserPlantModule {}
