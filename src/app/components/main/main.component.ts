import { Component, TemplateRef, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent{

  public city: any = "Tel Aviv";
  public days: any = undefined;
  public today: any;
  public searchedCity: any;
  public city_id: number;
  public inFavorites: boolean = false;
  public modalRef: BsModalRef;

  constructor(private weatherService: WeatherService, private modalService: BsModalService) { }

  public search(template): void {
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(this.city)) {
      this.days = undefined;
      this.weatherService.getLocationKey(this.city).subscribe(lk => {
        this.city_id = lk[0].Key;
        this.searchedCity = lk[0].LocalizedName;
        this.weatherService.getCityDetails(this.city_id).subscribe(cd => {
          this.days = cd.DailyForecasts;
          this.today = cd.DailyForecasts[0];

          const favorites = localStorage.getItem("myFavorites");
          if (favorites) {
            let myFavorites = JSON.parse(favorites);
            myFavorites.map(f =>
              this.inFavorites = f.id === this.city_id ? true : false);
          }
        });
      });

    }
    else {
      this.openModal(template);
    }
    // test with json
    // this.weatherService.getLocationKeyByJson().subscribe(lk => {
    //   this.city_id = lk[0].Key;
    //   this.searchedCity = lk[0].LocalizedName;
    //   this.weatherService.getJerusalemByJson().subscribe(cd => {
    //     this.days = cd.DailyForecasts;
    //     this.today = cd.DailyForecasts[0];

    //     const favorites = localStorage.getItem("myFavorites");
    //     if (favorites) {
    //       let myFavorites = JSON.parse(favorites);
    //       myFavorites.map(f =>
    //         this.inFavorites = f.id === this.city_id ? true : false);
    //     }
    //   });
    // });
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public addToFavorites() {
    const favoriteObj = {
      id: this.city_id,
      city: this.searchedCity,
      temperature: this.today.Temperature,
      status: this.today.Day.IconPhrase
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

  public searchByLocation(): void {
    navigator.geolocation.getCurrentPosition(async position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const location = `?lat=${latitude}&lon=${longitude}`;
      this.weatherService.getGeolocation(location).subscribe(gl => {
        this.city = gl.city.name;
      });
    });
  }

}
