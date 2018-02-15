import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

import { SharedService } from './service/shared.service';
import { fadeAnimation } from './app-routing.animations';
import { tap } from 'rxjs/operators/tap';
import { filter } from 'rxjs/operators/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation],
})
export class AppComponent implements OnInit {

  title: string;
  @ViewChild(MatSidenav) sideNav: MatSidenav;

  constructor(public router: Router, public shared: SharedService) {
  }

  ngOnInit() {
    /** When router changes */
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap((route: NavigationEnd) => {
        this.sideNav.close();
      })
    ).subscribe();
  }

  getState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

}


