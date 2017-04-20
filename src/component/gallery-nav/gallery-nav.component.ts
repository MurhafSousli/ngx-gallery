import { Component, Input, OnInit } from '@angular/core';
import { GalleryService } from '../../service/gallery.service';

@Component({
  selector: 'gallery-nav',
  templateUrl: './gallery-nav.component.html',
  styleUrls: ['./gallery-nav.component.scss']
})
export class GalleryNavComponent implements OnInit {

  @Input() state;

  constructor(private gallery: GalleryService) {
  }

  ngOnInit() {
  }

}
