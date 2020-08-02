import { Component, OnInit, Input } from '@angular/core';
import { Favorite } from 'src/models/favorite';

@Component({
  selector: 'app-favorites-card',
  templateUrl: './favorites-card.component.html',
  styleUrls: ['./favorites-card.component.scss']
})
export class FavoritesCardComponent implements OnInit {
  @Input() favorite: Favorite;
  public temperature: string;

  ngOnInit() {
    const minFeh = this.favorite.temperature.Minimum.Value;
    const minCel = Math.round((minFeh - 32) * 5/9);
    const max = this.favorite.temperature.Maximum.Value;
    const maxCel = Math.round((max - 32) * 5/9);
    this.temperature = `${minCel} - ${maxCel}`;
  }

}
