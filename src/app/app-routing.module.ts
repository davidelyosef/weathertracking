import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './components/main/main.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  {path: "main", component: MainComponent},
  {path: "favorites", component: FavoritesComponent},
  {path: "", redirectTo: "/main", pathMatch: "full"},
  {path: "**", redirectTo: "/main", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgbModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
