import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent  implements OnInit {

  images;
  images$ = this.shared.getHDImages('sea');

  features = [
    'Custom components',
    'Images',
    'Videos',
    'Iframes',
    'Thumbnails',
    'Dots',
    'Navigation',
    'Auto-detect',
    'Lightbox',
    'Multiple instances',
    'Gestures support',
    'Universal support'
  ];

  constructor(public shared: SharedService) {
  }

  ngOnInit() {
    this.images$.subscribe(res => {
      this.images = res;
    });
  }

}
