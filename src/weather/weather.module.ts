import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weather } from './entities/weather.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Weather]), // très important pour injecter Repository
  ],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
