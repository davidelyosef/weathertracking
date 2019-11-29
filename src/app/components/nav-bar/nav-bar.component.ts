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
      console.log("on");
      this.redux.getState().bgColor = "white";
      console.log(this.redux.getState().bgColor);
    }
    else {
      console.log("off");
      this.redux.getState().bgColor = "black";
      console.log(this.redux.getState().bgColor);

    }
  }
}
