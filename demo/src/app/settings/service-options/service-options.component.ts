import {Component, OnInit} from '@angular/core';
import {GalleryService} from '../../gallery';

@Component({
  selector: 'service-options',
  templateUrl: './service-options.component.html',
  styleUrls: ['./service-options.component.scss']
})
export class ServiceOptionsComponent implements OnInit {


  constructor(public gallery: GalleryService) {

  }

  ngOnInit() {
  }

}
