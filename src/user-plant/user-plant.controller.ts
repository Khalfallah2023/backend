import { Controller, Post, Get, Delete, Param, UseGuards, Request, Body } from '@nestjs/common';
import { UserPlantService } from './user-plant.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Plant } from '../plants/entities/plant.entity';
import { AddPlantDto } from './dto/add-plant.dto';
@Controller('user-plants')
export class UserPlantController {
  constructor(private readonly userPlantsService: UserPlantService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':plantId')
  addPlant(
    @Request() req,
    @Param('plantId') plantId: string,
    @Body() plantData: AddPlantDto
  ) {
    return this.userPlantsService.addPlantToUser(
      req.user.userId,
    plantId,
    plantData.quantity,       // quantité plantée par l'utilisateur
    plantData.plantingDate
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUserPlants(@Request() req) {
    return this.userPlantsService.getUserPlants(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':plantId')
  removePlant(@Request() req, @Param('plantId') plantId: string) {
    return this.userPlantsService.removePlantFromUser(req.user.userId, plantId); // Plus besoin de convertir en nombre
  }
}