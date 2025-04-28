import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreatePlantDto {
  @IsString()
  title: string;

  @IsString()
  image: string;

  @IsString()
  backgroundColor: string;

  @IsString()
  color: string;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsDate()
  plantingDate?: Date;

  @IsOptional()
  @IsDate()
  expectedHarvest?: Date;

  @IsOptional()
  @IsString()
  wateringSchedule?: string = 'Every 2 days';

  @IsOptional()
  @IsDate()
  lastWatered?: Date;

  @IsOptional()
  @IsString()
  growthPhase?: string = 'Phase 1: Seedling';

  @IsOptional()
  @IsNumber()
  growthProgress?: number = 0;
}