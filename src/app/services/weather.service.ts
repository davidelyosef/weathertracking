import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private API_KEY = "?apikey=Bdtfu2OnDFSAmpquELvzARuxy4FlE2E1";
  private ROOT_URL = "http://dataservice.accuweather.com/";

  constructor(private httpClient: HttpClient) { }

  public getLocationKey(city): Observable<any> {
    return this.httpClient.get(`${this.ROOT_URL}locations/v1/cities/search${this.API_KEY}&q=${city}`);
  }

  public getCityDetails(location_key): Observable<any> {
    return this.httpClient.get(`${this.ROOT_URL}forecasts/v1/daily/5day/${location_key}${this.API_KEY}`);
    // return this.httpClient.get('./assets/json/jerusalem.json');
  }

  public autoComplete(keyword): Observable<any> {
    return this.httpClient.get(`${this.ROOT_URL}locations/v1/cities/autocomplete${this.API_KEY}&q=${keyword}`);
  }

  public getGeoPosition(coordinates): Observable<any> {
    return this.httpClient.get(`${this.ROOT_URL}locations/v1/cities/geoposition/search${this.API_KEY}&q=${coordinates}`);
  }

  public getCitiesByGoogle(): any {
    return this.httpClient.get('http://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=AIzaSyC_1BsTCRaMl0G319JdCthvGFy5HTMtbIM');
  }
  
}
