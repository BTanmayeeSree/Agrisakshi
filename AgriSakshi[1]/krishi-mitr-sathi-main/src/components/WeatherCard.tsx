import { Card } from "@/components/ui/card";
import { CloudRain, Sun, Thermometer, Droplets, Wind } from "lucide-react";

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  condition: "sunny" | "cloudy" | "rainy";
  forecast: Array<{
    day: string;
    temp: number;
    condition: string;
  }>;
}

interface WeatherCardProps {
  weather: WeatherData;
  location: string;
}

export function WeatherCard({ weather, location }: WeatherCardProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="w-8 h-8 text-harvest-gold" />;
      case "rainy":
        return <CloudRain className="w-8 h-8 text-rain-blue" />;
      default:
        return <Sun className="w-8 h-8 text-sky-blue" />;
    }
  };

  return (
    <Card className="p-6 bg-gradient-sky shadow-card border-0">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Weather Today</h3>
          <p className="text-sm text-muted-foreground">📍 {location}</p>
        </div>
        {getWeatherIcon(weather.condition)}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Thermometer className="w-5 h-5 text-harvest-gold" />
          <div>
            <p className="text-2xl font-bold text-foreground">{weather.temperature}°C</p>
            <p className="text-xs text-muted-foreground">Temperature</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Droplets className="w-5 h-5 text-rain-blue" />
          <div>
            <p className="text-2xl font-bold text-foreground">{weather.humidity}%</p>
            <p className="text-xs text-muted-foreground">Humidity</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <CloudRain className="w-5 h-5 text-rain-blue" />
          <div>
            <p className="text-2xl font-bold text-foreground">{weather.rainfall}mm</p>
            <p className="text-xs text-muted-foreground">Rainfall</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Wind className="w-5 h-5 text-sky-blue" />
          <div>
            <p className="text-2xl font-bold text-foreground">{weather.windSpeed} km/h</p>
            <p className="text-xs text-muted-foreground">Wind Speed</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium text-foreground">7-Day Forecast</h4>
        <div className="flex space-x-2 overflow-x-auto">
          {weather.forecast.map((day, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center min-w-[70px]"
            >
              <p className="text-xs text-muted-foreground mb-1">{day.day}</p>
              {getWeatherIcon(day.condition)}
              <p className="text-sm font-semibold text-foreground mt-1">{day.temp}°</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}