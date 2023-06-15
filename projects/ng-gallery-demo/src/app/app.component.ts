import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material/sidenav';
import { MatIconRegistry } from '@angular/material/icon';
import { tap, filter } from 'rxjs';

import { fadeAnimation } from './app-routing.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit {

  title: string;
  @ViewChild(MatSidenav) sideNav: MatSidenav;

  constructor(private _router: Router, private matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'logo',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/img/ng-gallery.svg')
    );
  }

  ngOnInit() {
    /** When router changes */
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(() => this.sideNav.close())
    ).subscribe();
  }

  getState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

}


