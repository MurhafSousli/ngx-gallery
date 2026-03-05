import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { HttpResourceRef } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { GalleryItemData, GalleryModule } from 'ng-gallery';
import { Pixabay } from '../../service/pixabay.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { BadgesComponent } from '../../shared/badges/badges.component';

@Component({
  host: {
    'class': 'page'
  },
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  private readonly pixabay: Pixabay = inject(Pixabay);

  readonly images: HttpResourceRef<GalleryItemData[]> = this.pixabay.getImages('mountain');

  ngOnInit() {
    this.title.setTitle('Home | ng-gallery');
  }
}
