import { Component, OnInit } from '@angular/core';
import { Favorite } from 'src/models/favorite';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  public favorites: Favorite;

  ngOnInit() {
    const favorites = localStorage.getItem("myFavorites");
    if (favorites) {
      this.favorites = JSON.parse(favorites);
      this.favorites = this.favorites.length < 1 ? undefined : this.favorites;
    }

  }

}
