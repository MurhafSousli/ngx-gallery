import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  features = [
    'Easy to use',
    'Massively customizable',
    'Images, videos and iframes',
    'Thumbnails',
    'Dots',
    'Navigation',
    'Auto-detect',
    'Lightbox',
    'Auto player',
    'Error handling support',
    'Gestures support',
    'Universal support',
  ];

}
