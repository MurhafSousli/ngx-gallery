import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Pixabay } from '../../service/pixabay.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  images$ = this._pixabay.getHDImages('see');

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

  constructor(private _pixabay: Pixabay) {
  }

}
