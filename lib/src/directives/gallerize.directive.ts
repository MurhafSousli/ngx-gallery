import { Directive, ElementRef, Renderer2, Input, OnInit, OnDestroy } from '@angular/core';
import { Gallery } from '../services/gallery.service';
import { GalleryItem } from '../models';

import { from } from 'rxjs/observable/from';
import { map, finalize } from 'rxjs/operators';

@Directive({
  selector: '[gallerize]'
})
export class GallerizeDirective implements OnInit, OnDestroy {

  /** Add images with specific classes to the gallery */
  @Input() gallerize: string;
  observer: MutationObserver;

  constructor(private el: ElementRef, private renderer: Renderer2, private gallery: Gallery) {
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
          from(imageElements).pipe(
            map((img: HTMLImageElement, i) => {

              /** Add click event to the image */
              this.renderer.setStyle(img, 'cursor', 'pointer');
              this.renderer.setProperty(img, 'onclick', () => this.gallery.open(i));

              /** Create image item for the gallery */
              images.push({
                src: img.hasAttribute('src-full') ? img.getAttribute('src-full') : img.src,
                thumbnail: img.src,
                text: img.alt
              });
            }),
            finalize(() => this.gallery.load(images))
          ).subscribe();
        }
      });
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
