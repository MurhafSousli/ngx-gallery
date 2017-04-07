import {Component, Input, OnInit} from '@angular/core';
import {LightBoxService} from "../../service/light-box.service";
import {trigger, state, style, transition, animate} from "@angular/animations";

@Component({
  selector: 'light-box-images',
  templateUrl: './light-box-images.component.html',
  styleUrls: ['./light-box-images.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class LightBoxImagesComponent implements OnInit {

  @Input() state;

  constructor(private lightbox: LightBoxService) {
  }

  ngOnInit() {
  }

}
