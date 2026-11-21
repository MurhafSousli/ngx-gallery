import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { HttpResourceRef } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { GalleryItemData, GalleryModule } from 'ng-gallery';
import { Picsum } from '../../service/picsum.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { BadgesComponent } from '../../shared/badges/badges.component';

@Component({
  host: {
    'class': 'page'
  },
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    MatButtonModule,
    RouterLink,
    BadgesComponent,
    FooterComponent,
    GalleryModule
  ]
})
export class HomeComponent implements OnInit {

  private readonly title: Title = inject(Title);
  private readonly picsum: Picsum = inject(Picsum);

  readonly images: HttpResourceRef<GalleryItemData[]> = this.picsum.getImages('mountain');

  ngOnInit() {
    this.title.setTitle('Home | ng-gallery');
  }
}
