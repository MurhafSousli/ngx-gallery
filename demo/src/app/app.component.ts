import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  homePage;
  gOptions;

  constructor(public router: Router) {
  }

  ngOnInit() {
    /** When router changes */
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((route: NavigationEnd) => {
        this.homePage = (route.url === '/');
        this.gOptions = !(route.url === '/' || route.url === '/getting-started');
      });
  }

}
