// src/plants/dto/create-plant.dto.ts
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePlantDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsString()
  @IsOptional()
  backgroundColor?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsString()
  @IsOptional()
  plantingDate?: string;

  @IsString()
  @IsOptional()
  expectedHarvest?: string;

  @IsString()
  @IsOptional()
  wateringSchedule?: string;

  @IsString()
  @IsOptional()
  lastWatered?: string;

  @IsString()
  @IsOptional()
  growthPhase?: string;

  @IsNumber()
  @IsOptional()
  growthProgress?: number;
}