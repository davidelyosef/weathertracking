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
import { StoreModule } from '@ngrx/store';
import { counterReducer, backgroundReducer, citiesReducer } from './store/reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers } from './store';

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
    // ngrx staff
    StoreModule.forFeature('count', counterReducer),
    StoreModule.forFeature('bgColor', backgroundReducer),
    StoreModule.forFeature('searchedCities', citiesReducer),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  // backgroundReducer
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }