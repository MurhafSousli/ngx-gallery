import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Gallery, GalleryItem } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pixabay } from '../../service/pixabay.service';

@Component({
  selector: 'lightbox-example',
  templateUrl: './lightbox-example.component.html',
  styleUrls: ['./lightbox-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LightboxExampleComponent implements OnInit, OnDestroy {

  code: any;
  space$: Observable<GalleryItem[]>;

  constructor(public gallery: Gallery, public lightbox: Lightbox, public _pixabay: Pixabay) {
    this.code = code;
  }

  ngOnInit() {
    this.space$ = this._pixabay.getImages('space').pipe(
      map((items: GalleryItem[]) => {
        // Load items manually into the lightbox gallery ref
        this.gallery.ref('lightbox', {
          thumbPosition: 'top'
        }).load(items);

        return items;
      })
    );
  }

  ngOnDestroy() {
    this.gallery.destroy('lightbox');
  }

}

const code = {
  ex: `import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';

@Component({
  template: \`
    <div class="grid">
      <div class="grid-item" *ngFor="let item of items; let i = index" (click)="lightbox.open(i)">
        <img [src]="item.data.thumbnail">
      </div>
    </div>
  \`
})
export class AppComponent implements OnInit {

  items: GalleryItem[];

  constructor(public gallery: Gallery, public lightbox: Lightbox) { }

  ngOnInit() {
    this.gallery.ref('lightbox').load(items);
  }
}`,
  alt: `this.lightbox.open(0, 'lightbox', {
  panelClass: 'fullscreen'
});`
};
