import { Directive, ElementRef, Renderer2, Input, OnInit, OnDestroy } from '@angular/core';
import { Gallery } from '../services/gallery.service';
import { GalleryItem } from '../models';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';

@Directive({
  selector: '[gallerize]'
})
export class GallerizeDirective implements OnInit, OnDestroy {

  /** gallerize images with specific classes */
  @Input() gallerize: string;
  observer: MutationObserver;

  constructor(public el: ElementRef, public renderer: Renderer2, public gallery: Gallery) {
  }

  ngOnInit() {

    /** Observe content changes */

    this.observer = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach((mutation: MutationRecord) => {

          const images: GalleryItem[] = [];

          /** Serialize img classes */
          const classes = (this.gallerize) ? this.gallerize.split(' ').map((className) => '.' + className) : '';

          /** get all img elements from content */
          const imageElements = this.el.nativeElement.querySelectorAll('img' + classes);

          if (imageElements) {
            Observable.from(imageElements)
              .map((img: HTMLImageElement, i) => {

                /** Add click event to the image */
                this.renderer.setStyle(img, 'cursor', 'pointer');
                this.renderer.setProperty(img, 'onclick', () => this.gallery.open(i));

                /** Create image item for the gallery */
                images.push({
                  src: img.src,
                  text: img.alt
                });
              })
              .finally(() => this.gallery.load(images))
              .subscribe();
          }
        }
      );
    });

    const config: MutationObserverInit = {
      attributes: true,
      childList: true,
      characterData: true
    };

    this.observer.observe(this.el.nativeElement, config);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
