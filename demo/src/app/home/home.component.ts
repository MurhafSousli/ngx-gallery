import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Gallery } from 'ng-gallery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: Title, public gallery: Gallery) {
  }

  ngOnInit() {
    this.titleService.setTitle('Home | ng-gallery');
  }

}
