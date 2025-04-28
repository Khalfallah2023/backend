import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePlantMetricDto {
  @IsNumber()
  @IsOptional()
  ph?: number;

  @IsNumber()
  @IsOptional()
  temperature?: number;

  @IsNumber()
  @IsOptional()
  humidity?: number;

  @IsNumber()
  @IsOptional()
  nitrogen?: number;

  @IsNumber()
  @IsOptional()
  potassium?: number;

  @IsNumber()
  @IsOptional()
  calcium?: number;

  @IsNumber()
  @IsOptional()
  phosphorus?: number;

  @IsString()
  @IsOptional()
  pressure?: string;

  @IsString()
  @IsOptional()
  airQuality?: string;

  @IsString()
  @IsOptional()
  windSpeed?: string;
}