import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  public constructor(private redux: NgRedux<AppState>) { }

  handle(str) {
    if (str) {
      this.redux.getState().bgColor = "white";
    }
    else {
      this.redux.getState().bgColor = "black";
    }
  }
}
