import { Component, OnInit } from '@angular/core'

import { routerTransition } from './router.animation'
import { LibraryService } from './library.service';

@Component({
  selector: 'app-root',
  providers: [],
  animations: [routerTransition],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private libraryService: LibraryService) { }

  getState(outlet) {
    return outlet.activatedRouteData.state
  }

  ngOnInit() {
  }
}
