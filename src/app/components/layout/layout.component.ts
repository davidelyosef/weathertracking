import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  public bgColor: any;

  constructor(private redux: NgRedux<AppState>) { }

  ngOnInit() {
    this.bgColor = this.redux.getState().bgColor;
    const div = document.getElementById("app");
    setInterval(() => {
      if (this.redux.getState().bgColor) {
        div.style.backgroundColor = this.redux.getState().bgColor;
      }
    }, 500)
  }



}
