import { Component, ViewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgProgressbar } from 'ngx-progressbar';
import { NgProgressRouter } from 'ngx-progressbar/router';
import { NgProgressHttp } from 'ngx-progressbar/http';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { tap, filter } from 'rxjs';

import { fadeAnimation } from './app-routing.animations';
import { MenuComponent } from './shared/menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation],
  imports: [
    NgProgressbar,
    NgProgressRouter,
    NgProgressHttp,
    RouterModule,
    MenuComponent,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule
  ]
})
export class AppComponent implements OnInit {

  title: string;
  @ViewChild(MatSidenav) sideNav: MatSidenav;

  constructor(private router: Router, private matIconRegistry: MatIconRegistry, library: FaIconLibrary, domSanitizer: DomSanitizer) {
    library.addIcons(faTwitter, faGithub, faExternalLinkAlt);

    this.matIconRegistry.addSvgIcon(
      'logo',
      domSanitizer.bypassSecurityTrustResourceUrl('img/ng-gallery.svg')
    );
  }

  ngOnInit() {
    /** When router changes */
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap((e) => {
        this.sideNav.close()
      })
    ).subscribe();
  }

  getState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

}


