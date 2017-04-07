import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LightBoxService} from "../service/light-box.service";

@Component({
  selector: 'light-box',
  templateUrl: './light-box.component.html',
  styleUrls: ['./light-box.component.scss']
})
export class LightBoxComponent implements OnInit, OnDestroy {

  constructor(private lightbox: LightBoxService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.lightbox.reset();
  }

}
