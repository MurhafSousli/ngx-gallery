import { Component, ViewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LightBoxService } from '../lightbox';
import { Defaults } from './main.defaults';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  group1;
  group2;

  constructor(private lightbox: LightBoxService) {

  }

  ngOnInit() {
    this.group1 = [
      'assets/img/img1.jpg',
      'assets/img/img2.jpg',
      'assets/img/img3.jpg',
      'assets/img/img4.jpg',
    ]
    // this.group2 = [
    //   'assets/img/img5.jpg',
    //   'assets/img/img6.jpg',
    //   'assets/img/img7.jpg',
    // ]

    this.group2 = Observable.of(`
      <img src="assets/img/img1.jpg" alt="Clock">
      <img src="assets/img/img2.jpg" alt="See Sunset View">
      <img src="assets/img/img5.jpg" alt="Peacock">
      <img src="assets/img/img6.jpg" alt="Snow Mountains View">
      <img src="assets/img/img7.jpg" alt="City Sunset View">
    `).delay(1500);

  }

}
