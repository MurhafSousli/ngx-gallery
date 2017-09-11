import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import { GalleryService } from '../service/gallery.service';
import { GalleryImage } from '../service/gallery.state';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';

@Directive({
  selector: '[gallerize]'
})
export class GalleryDirective implements OnInit {

  // A flag to check if content has changed
  content;

  @Input() gallerize: string;

  constructor(public el: ElementRef, public renderer: Renderer2, public gallery: GalleryService) {
  }

  ngOnInit() {

    var target = this.gallerize ? this.el.nativeElement.querySelectorAll(this.gallerize) : this.el.nativeElement;

    var updateGallery = function () {
      // skip if content is the same
      if (this.content === this.target.innerText) {
        return;
      }
      else {
        this.content = this.target.innerText;
      }

      const images: GalleryImage[] = [];

      // get all img elements from content
      const imageElements = this.target.querySelectorAll(`img`);

      if (imageElements) {
        Observable.from(imageElements).map((img: HTMLImageElement, i) => {
          // add click event to the images
          this.renderer.setStyle(img, 'cursor', 'pointer');
          this.renderer.setProperty(img, 'onclick', () => {
            this.gallery.set(i);
          });

          // create an image item
          images.push({
            src: img.src,
            text: img.alt
          });
        })
          .finally(() => this.gallery.load(images))
          .subscribe();

      }
    }
    // create an observer instance
    var observer = new MutationObserver(updateGallery);

    var config = { subtree: true, childList: true }
    observer.observe(target, config);
    updateGallery();
  }
}
