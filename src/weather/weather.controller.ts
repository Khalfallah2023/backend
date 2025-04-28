import { Controller, Post, Body } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  async createWeatherEntry(@Body('city') city: string) {
    return this.weatherService.createWeatherEntry(city);
  }
}
