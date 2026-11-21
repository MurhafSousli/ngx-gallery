import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpResourceRef } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GalleryItemData, } from 'ng-gallery';
import { LightboxModule, provideLightboxOptions } from 'ng-gallery/lightbox';

import { Picsum } from '../../service/picsum.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NoteComponent } from '../../shared/note/note.component';

@Component({
  host: {
    'class': 'page'
  },
  selector: 'lightbox-example',
  templateUrl: './lightbox-example.component.html',
  styleUrl: './lightbox-example.component.scss',
  providers: [
    provideLightboxOptions({
    })
  ],
  imports: [
    NoteComponent,
    MatButtonModule,
    FontAwesomeModule,
    FooterComponent,
    LightboxModule,
  ]
})
export class LightboxExampleComponent implements OnInit {

  private picsum: Picsum = inject(Picsum);

  private _title: Title = inject(Title);

  photos: HttpResourceRef<GalleryItemData[]> = this.picsum.getImages('sea');

  ngOnInit(): void {
    this._title.setTitle('Lightbox | ng-gallery');
  }
}

