import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import 'rxjs/add/operator/filter';
import { Gallery } from 'ng-gallery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object, public gallery: Gallery) {

    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      if (isPlatformBrowser(this.platformId)) {
        window.scroll(0, 0);
      }
    });
  }

  ngOnInit() {

    this.gallery.load([
      {
        src: 'assets/clouds.jpg',
        thumbnail: 'assets/clouds.jpg',
        text: 'Coulds'
      },
      {
        src: 'assets/img8.jpg',
        thumbnail: 'assets/img8.jpg',
        text: 'See Sunset View'
      },
      {
        src: 'assets/img7.jpg',
        thumbnail: 'assets/img7.jpg',
        text: 'Spring'
      },
      {
        src: 'assets/img12.jpg',
        thumbnail: 'assets/img12.jpg',
        text: 'Spring'
      }
    ]);
  }
}
