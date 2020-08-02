import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public bg$: Observable<string>;

  constructor(private store: Store<{ bgColor: string }>) { 
    this.bg$ = store.pipe(select('bgColor'));
  }

  ngOnInit() {
  }

}
