import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { toSignal } from '@angular/core/rxjs-interop';
import { GalleryItemData, } from 'ng-gallery';
import { LightboxModule, provideLightboxOptions } from 'ng-gallery/lightbox';

import { Pixabay } from '../../service/pixabay.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NoteComponent } from '../../shared/note/note.component';

@Component({
  host: {
    'class': 'page'
  },
  selector: 'lightbox-example',
  templateUrl: './lightbox-example.component.html',
  styleUrl: './lightbox-example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  private pixabay: Pixabay = inject(Pixabay);

  private _title: Title = inject(Title);

  photos: Signal<GalleryItemData[]> = toSignal(this.pixabay.getHDImages('sea'));

  ngOnInit(): void {
    this._title.setTitle('Lightbox | ng-gallery');
  }
}

