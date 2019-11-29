import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-favorites-card',
  templateUrl: './favorites-card.component.html',
  styleUrls: ['./favorites-card.component.css']
})
export class FavoritesCardComponent implements OnInit {
  @Input() favorite: any;
  public temperature: string;

  constructor() { }

  ngOnInit() {
    const minFeh = this.favorite.temperature.Minimum.Value;
    const minCel = Math.round((minFeh - 32) * 5/9);
    const max = this.favorite.temperature.Maximum.Value;
    const maxCel = Math.round((max - 32) * 5/9);
    this.temperature = `${minCel} - ${maxCel}`;
  }

}
