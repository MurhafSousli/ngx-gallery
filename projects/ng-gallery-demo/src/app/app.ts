import { afterNextRender, Component, inject, Signal, viewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgProgressHttp } from 'ngx-progressbar/http';
import { MenuComponent } from './shared/menu/menu.component';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { NgProgressRouter } from 'ngx-progressbar/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { NgProgressbar } from 'ngx-progressbar';
import { DomSanitizer } from '@angular/platform-browser';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    NgProgressbar,
    NgProgressRouter,
    NgProgressHttp,
    RouterLink,
    RouterOutlet,
    MenuComponent,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',

})
export class App {

  sideNav: Signal<MatSidenav> = viewChild.required(MatSidenav);

  private router: Router = inject(Router);
  private matIconRegistry: MatIconRegistry = inject(MatIconRegistry);
  private library: FaIconLibrary = inject(FaIconLibrary);
  private domSanitizer: DomSanitizer = inject(DomSanitizer)

  constructor() {
    // TODO: Move the following to init function
    this.library.addIcons(faTwitter, faGithub, faExternalLinkAlt);

    this.matIconRegistry.addSvgIcon(
      'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('img/ng-gallery.svg')
    );
  }

  ngOnInit() {
    /** When router changes */
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(() => this.sideNav().close())
    ).subscribe();
  }
}
