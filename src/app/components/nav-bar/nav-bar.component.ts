import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { bgColor2, bgColor1 } from 'src/app/store/actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  public constructor(private store: Store<{ bgColor: string }>) { }

  public handle(str) {
    if (str) {
      this.store.dispatch(bgColor2());
    }
    else {
      this.store.dispatch(bgColor1());
    }
  }
}
