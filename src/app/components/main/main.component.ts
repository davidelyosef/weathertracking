import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Day } from 'src/models/day';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { increment, decrement, reset, searchingCities } from 'src/app/store/actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public city: string = "Tel Aviv";
  public days: [] = undefined;
  public today: Day;
  public searchedCity: string;
  public city_id: number;
  public inFavorites: boolean = false;
  public modalRef: BsModalRef;

  public count$: Observable<number>;

  constructor(private weatherService: WeatherService, private modalService: BsModalService,
    private store: Store<any>) {

    this.count$ = store.pipe(select('count'));
  }

  ngOnInit() {
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  public tempSearch(template): void {
    const regex = /^[a-zA-Z\s]*$/;
    this.city = this.capitalize(this.city);
    if (regex.test(this.city)) {

      this.store.select('searchedCities').subscribe(cities => {
        let existOnMemory = false;
        cities.map(city => {
          if (city.city === this.capitalize(this.city)) {
            existOnMemory = true;
            console.log("take info from redux and not from server");
            this.city = city.city;
            this.city_id = city.id;
            this.days = city.DailyForecasts;
            this.today = city.DailyForecasts[0];
            this.searchedCity = this.city;
          }
        });

        if (!existOnMemory) {
          console.log("take info from the service and not from redux");
          this.city_id = 213225;
          this.city = 'Jerusalem';
          this.weatherService.getCityDetails(this.city_id).subscribe(details => {
            this.days = details.DailyForecasts;
            this.today = details.DailyForecasts[0];
            this.searchedCity = this.city;

            // NgRX
            const lastCity = {
              id: this.city_id,
              city: this.city,
              DailyForecasts: details.DailyForecasts
            }
            this.store.dispatch(searchingCities({ lastCity }));
          })
        }

        const favorites = localStorage.getItem("myFavorites");
        if (favorites) {
          let myFavorites = JSON.parse(favorites);
          myFavorites.map(f =>
            this.inFavorites = f.id === this.city_id ? true : false);
        }

      });
    }
    else {
      this.modalRef = this.modalService.show(template);
    }
  }

  // search city function
  public search(template): void {
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(this.city)) {

      this.city = this.capitalize(this.city);
      this.days = undefined;

      this.store.select('searchedCities').subscribe(cities => {
        console.log('cities: ', cities);
        let existOnMemory = false;
        cities.map(city => {
          if (city.city === this.city) {
            existOnMemory = true;
            console.log("take info from redux and not from server");
            this.city = city.city;
            this.city_id = city.id;
            this.days = city.DailyForecasts;
            this.today = city.DailyForecasts[0];
            this.searchedCity = this.city;
          }
        });

        if (!existOnMemory) {

          this.weatherService.getLocationKey(this.city).subscribe(lk => {
            this.city_id = lk[0].Key;
            // this.city = lk[0].LocalizedName;
            this.weatherService.getCityDetails(this.city_id).subscribe(cd => {
              this.days = cd.DailyForecasts;
              this.today = cd.DailyForecasts[0];
              this.searchedCity = this.city;
              // NgRX
              const lastCity = {
                id: this.city_id,
                city: this.city,
                DailyForecasts: cd.DailyForecasts
              }
              this.store.dispatch(searchingCities({ lastCity }));
            });
          });

        }

      });

      const favorites = localStorage.getItem("myFavorites");
      if (favorites) {
        let myFavorites = JSON.parse(favorites);
        myFavorites.map(f =>
          this.inFavorites = f.id === this.city_id ? true : false);
      }
    }
    else {
      this.modalRef = this.modalService.show(template);
    }

  }

  // capitalize a string
  public capitalize(str: string) {
    return str.charAt(0).toUpperCase() + this.city.slice(1).toLowerCase();
  }

  // add city to favorites
  public addToFavorites() {
    const favoriteObj = {
      id: this.city_id,
      city: this.city,
      temperature: this.today.Temperature,
      status: this.today.Day.IconPhrase,
      icon: this.today.Day.Icon
    }
    const favorites = localStorage.getItem("myFavorites");
    if (!favorites) {
      localStorage.setItem("myFavorites", JSON.stringify([favoriteObj]));
    }
    else {
      let myFavorites = JSON.parse(favorites);
      myFavorites.push(favoriteObj);
      localStorage.setItem("myFavorites", JSON.stringify(myFavorites));
    }
    this.inFavorites = true;
  }

  // delete city from favorites
  public deleteFromFavorites(): void {
    const favorites = localStorage.getItem("myFavorites");
    let myFavorites = JSON.parse(favorites);
    for (let i = 0; i < myFavorites.length; i++) {
      if (myFavorites[i].id === this.city_id) {
        myFavorites.splice(i, 1);
      }
    }
    const myFavoritesString = JSON.stringify(myFavorites);
    localStorage.setItem("myFavorites", myFavoritesString);
    this.inFavorites = false;
  }

  // search city by your geolocation
  public searchByLocation(): void {
    navigator.geolocation.getCurrentPosition(async position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const location = `${latitude},${longitude}`;
      this.weatherService.getGeoPosition(location).subscribe(gl => {
        this.city = gl.EnglishName;
      });
    });
  }

}
