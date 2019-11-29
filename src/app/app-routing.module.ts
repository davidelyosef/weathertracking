import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './components/main/main.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { Page404Component } from './components/page404/page404.component';


const routes: Routes = [
  {path: "main", component: MainComponent},
  {path: "favorites", component: FavoritesComponent},
  {path: "page-not-found", component: Page404Component},
  {path: "", redirectTo: "/main", pathMatch: "full"},
  {path: "**", redirectTo: "/main", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgbModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
