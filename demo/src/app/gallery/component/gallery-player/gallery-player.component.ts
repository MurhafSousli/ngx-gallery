import {Component, OnInit} from '@angular/core';
import {GalleryService} from "../../service/gallery.service";

@Component({
  selector: 'gallery-player',
  templateUrl: './gallery-player.component.html',
  styleUrls: ['./gallery-player.component.scss']
})
export class GalleryPlayerComponent implements OnInit {

  constructor(public gallery: GalleryService) {
  }

  ngOnInit() {
  }

  getProgressStyle() {

    if (this.gallery.config.player.autoplay) {
      return {
        transition: `all linear ${this.gallery.config.player.speed}ms`,
        width: '100%'
      };
    } else {
      return {
        transition: 'none',
        width: '0'
      };
    }
  }
}
