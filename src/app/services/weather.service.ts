import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  public getLocationKey(city): any {
    return this.httpClient.get(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=Bdtfu2OnDFSAmpquELvzARuxy4FlE2E1&q=${city}`);
  }

  public getCityDetails(location_key): any {
    return this.httpClient.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${location_key}?apikey=Bdtfu2OnDFSAmpquELvzARuxy4FlE2E1`);
  }

  public getGeolocation(string): any {
    return this.httpClient.get(`https://api.openweathermap.org/data/2.5/forecast${string}&APPID=e4063054bda92f3ca54619eb59a22adf`)
  }
}
