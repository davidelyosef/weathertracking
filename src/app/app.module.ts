import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';

import { LayoutComponent } from './components/layout/layout.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MainComponent } from './components/main/main.component';
import { Page404Component } from './components/page404/page404.component';
import { DailyForecastsComponent } from './components/daily-forecasts/daily-forecasts.component';
import { FavoritesCardComponent } from './components/favorites-card/favorites-card.component';
import { NgReduxModule, NgRedux } from 'ng2-redux';
import { AppState } from './redux/appState';
import { Reducer } from './redux/reducer';

@NgModule({
  declarations: [
  LayoutComponent,
  FavoritesComponent,
  NavBarComponent,
  MainComponent,
  Page404Component,
  DailyForecastsComponent,
  FavoritesCardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    NgReduxModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule {
  public constructor(redux: NgRedux<AppState>) {
    redux.configureStore(Reducer.reduce, new AppState());
  }
}
