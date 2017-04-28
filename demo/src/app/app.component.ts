import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {GalleryService} from "./gallery/service/gallery.service";
import {SharedService} from "./shared/service/shared.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  homePage;
  gOptions;

  constructor(public router: Router, public gallery: GalleryService, public shared: SharedService) {
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

  /** Currently we update the gallery with the new config by changing the route to ['/reload']
   * and redirect back to the previous route */

  reload(e) {
    if (this.router.url !== '/reload') {
      // save current url for reload
      this.shared.tempUrl = this.router.url;
      this.router.navigate(['/reload']);
    }
    this.gallery.config = e;
  }
}
