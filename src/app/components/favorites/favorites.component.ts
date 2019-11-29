import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public favorites: any;

  ngOnInit() {
    const favorites = localStorage.getItem("myFavorites");
    if (favorites) {
      this.favorites = JSON.parse(favorites);
      this.favorites = this.favorites.length < 1 ? undefined : this.favorites;
      console.log("this.favorites: ", this.favorites);
    }

  }

}
