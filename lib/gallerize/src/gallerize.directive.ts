import { Directive, ElementRef, Renderer2, Input, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';

import { Gallery, GalleryItem, ImageItem } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';

import { Subject } from 'rxjs/Subject';
import { from } from 'rxjs/observable/from';
import { empty } from 'rxjs/observable/empty';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { switchMap } from 'rxjs/operators/switchMap';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { finalize } from 'rxjs/operators';

@Directive({
  selector: '[gallerize]'
})
export class GallerizeDirective implements OnInit, OnDestroy, AfterContentChecked {

  gallerizer$ = new Subject();
  /** Add images with specific classes to the gallery */
  @Input() gallerize = 'root';
  @Input() forClass: string;

  constructor(private _el: ElementRef,
              private _renderer: Renderer2,
              private _lightbox: Lightbox,
              private _gallery: Gallery) {
  }

  ngOnInit() {

    /** Get galleryRef */
    const galleryRef = this._gallery.ref(this.gallerize);

    /** Serialize img classes */
    const classes = (this.forClass) ? this.forClass.split(' ').map((className) => '.' + className) : '';

    this.gallerizer$.pipe(
      debounceTime(300),
      switchMap(() => {

        /** get all img elements from content */
        const imageElements = this._el.nativeElement.querySelectorAll('img' + classes);

        if (imageElements && imageElements.length) {

          const images: GalleryItem[] = [];

          return from(imageElements).pipe(
            map((img: HTMLImageElement, i) => {
              // Add click event to the image
              this._renderer.setStyle(img, 'cursor', 'pointer');
              this._renderer.setProperty(img, 'onclick', () => this._lightbox.open(i, this.gallerize));
              return img;
            }),
            tap((img: HTMLImageElement) => images.push(new ImageItem(img.src, img.src))),
            finalize(() => galleryRef.load(images))
          );
        } else {
          return empty();
        }
      })
    ).subscribe();
  }

  ngAfterContentChecked() {
    this.gallerizer$.next();
  }

  ngOnDestroy() {
    this.gallerizer$.complete();
  }
}
