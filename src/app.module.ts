import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlantsModule } from './plants/plants.module';
import { PlantMetricsModule } from './plant-metrics/plant-metrics.module';
import { WeatherModule } from './weather/weather.module';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { UserPlantModule } from './user-plant/user-plant.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'agritech',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PlantsModule,
    PlantMetricsModule,
    WeatherModule,
    UsersModule,
    AuthModule,
    UserPlantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
