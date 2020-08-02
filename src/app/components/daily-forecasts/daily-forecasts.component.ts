import { Component, OnInit, Input } from '@angular/core';
import { Day } from 'src/models/day';

@Component({
  selector: 'app-daily-forecasts',
  templateUrl: './daily-forecasts.component.html',
  styleUrls: ['./daily-forecasts.component.scss']
})
export class DailyForecastsComponent implements OnInit {

  @Input() day: Day;
  public dateString: string;
  public dayOfWeek: string;
  public imageName: number;
  public celsius: string;
  public fahrenheit: string;
  public temperature: string;

  constructor() { }

  ngOnInit() {
    // get date string
    const date = new Date(this.day.Date);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.dateString = day + "/" + month;

    // get day of week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.dayOfWeek = daysOfWeek[date.getDay()];

    // get image url
    this.imageName = this.day.Day.Icon;

    // convert fahrient to celsius
    const maxFah = this.day.Temperature.Minimum.Value;
    const minCel = Math.round((maxFah - 32) * 5/9);
    const minFah = this.day.Temperature.Maximum.Value;
    const maxCel = Math.round((minFah - 32) * 5/9);
    this.fahrenheit = `${minFah} - ${maxFah}`;
    this.celsius = `${minCel} - ${maxCel}`;
    this.temperature = this.celsius;
  }

  public setTemperature($event) {
    if ($event.target.checked === true) {
      this.temperature = this.fahrenheit;
    }
    else {
      this.temperature = this.celsius;
    }
  }
}
