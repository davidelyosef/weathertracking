import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  public getLocationKey(city): any {
    return this.httpClient.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=Bdtfu2OnDFSAmpquELvzARuxy4FlE2E1&q=${city}`);
  }

  public getCityDetails(location_key): any {
    return this.httpClient.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${location_key}?apikey=Bdtfu2OnDFSAmpquELvzARuxy4FlE2E1`);
  }

  public autoComplete(city): any {
    return this.httpClient.get("http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=Bdtfu2OnDFSAmpquELvzARuxy4FlE2E1&q=" + city);
  }

  public getJerusalemByJson(): any {
    return this.httpClient.get("./assets/json/forecasts.json");
  }

  public getLocationKeyByJson(): any {
    return this.httpClient.get("./assets/json/locationKey.json");
  }

  public getGeolocation(string): any {
    return this.httpClient.get(`http://api.openweathermap.org/data/2.5/forecast${string}&APPID=e4063054bda92f3ca54619eb59a22adf`)
  }
}
// http://dataservice.accuweather.com/locations/v1/cities/search?apikey=Bdtfu2OnDFSAmpquELvzARuxy4FlE2E1&q=

// AC: http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=Bdtfu2OnDFSAmpquELvzARuxy4FlE2E1&q=tel%20aviv

// API: Bdtfu2OnDFSAmpquELvzARuxy4FlE2E1

// City search: http://dataservice.accuweather.com/locations/v1/cities/search?apikey=Bdtfu2OnDFSAmpquELvzARuxy4FlE2E1&q=Mumbai
// location key = this[0].key
// Jerusalem key: 213225

// Forecast: http://dataservice.accuweather.com/forecasts/v1/daily/5day/{{location key}}?apikey=Bdtfu2OnDFSAmpquELvzARuxy4FlE2E1
// this.DailyForecasts[0-4].date && .temperature

// Jerusalem Forecast: 
// http://dataservice.accuweather.com/forecasts/v1/daily/5day/213225?apikey=Bdtfu2OnDFSAmpquELvzARuxy4FlE2E1

// Fahrient to Celsius: ((fahrient) − 32) × 5/9 = num°C

// API: f2afcb9c9149f74731ec329eaf14316c

// http://api.openweathermap.org/data/2.5/forecast?lat=32.0920847&lon=34.8734416&APPID=e4063054bda92f3ca54619eb59a22adf
