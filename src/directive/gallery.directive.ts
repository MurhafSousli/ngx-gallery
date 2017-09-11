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
  srcList: string[] = [];

  @Input() gallerize: string;

  constructor(public el: ElementRef, public renderer: Renderer2, public gallery: GalleryService) {
  }

  pluck(array, field) {
    let s = [];
    for (let i = array.length; i--;) {
      s.push(array[i][field]);
    }

    return s.sort();
  }

  isEqual(array1, array2) {
    if (array1.length !== array2.length) {
      return false;
    }

    for (let i = array1.length; i--;) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }


    return true;
  }

  ngOnInit() {

    var target = this.gallerize ? this.el.nativeElement.querySelectorAll(this.gallerize) : this.el.nativeElement;

    var updateGallery = () => {
      // skip if content is the same
      if (this.content === target.innerText) {
        return;
      }
      else {
        this.content = target.innerText;
      }

      const images: GalleryImage[] = [];

      // get all img elements from content
      const imageElements = target.querySelectorAll(`img`);

      if (imageElements && imageElements.length) {
        let srcs = this.pluck(imageElements, 'src');
        if (this.isEqual(this.srcList, srcs)) {
          return;
        }

        this.srcList = srcs;

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
