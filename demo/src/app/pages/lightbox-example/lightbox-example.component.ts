import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SharedService } from '../../service/shared.service';
import { Gallery, GalleryItem } from '../../gallery/core';
import { Lightbox } from '../../gallery/lightbox';

@Component({
  selector: 'lightbox-example',
  templateUrl: './lightbox-example.component.html',
  styleUrls: ['./lightbox-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class LightboxExampleComponent implements OnInit, OnDestroy {

  code: any;
  space$;
  sub$: Subscription;

  constructor(public gallery: Gallery, public lightbox: Lightbox, public shared: SharedService) {
    this.code = code;
  }

  ngOnInit() {
    const lightbox = this.gallery.ref('lightbox', {
      thumbPosition: 'top'
    });
    this.space$ = this.shared.getImages('space');
    this.sub$ = this.space$.subscribe((items: GalleryItem[]) => {
      lightbox.load(items);
    });
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
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
  alt: `this.gallery.ref('lightbox', {
  thumbPosition: 'bottom',
  dots: true
}).load(items);`
};
