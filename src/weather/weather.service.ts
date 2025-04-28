import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Weather } from './entities/weather.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Weather)
    private readonly weatherRepository: Repository<Weather>,
  ) {}

  private readonly API_KEY = '164e112bb5b4ef1b46e6340f3509eed7';
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  async fetchWeatherByCity(city: string) {
    const url = `${this.BASE_URL}?q=${city}&appid=${this.API_KEY}&units=metric`;

    try {
      const response = await firstValueFrom(this.httpService.get(url));
      const data = response.data;

      return {
        location: data.name,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      };
    } catch (error) {
      console.error('Erreur lors de la récupération météo:', error.response?.data || error.message);
      throw new Error('Impossible de récupérer la météo');
    }
  }

  async createWeatherEntry(city: string) {
    const weatherData = await this.fetchWeatherByCity(city);

    const weather = this.weatherRepository.create({
      location: weatherData.location,
      temperature: weatherData.temperature,
      humidity: weatherData.humidity,
      windSpeed: weatherData.windSpeed,
    });

    return this.weatherRepository.save(weather);
  }
}
