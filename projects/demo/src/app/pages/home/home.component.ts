import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

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

  constructor(private _title: Title) {
  }

  ngOnInit() {
    this._title.setTitle('Home | ngx-gallery');
  }
}
