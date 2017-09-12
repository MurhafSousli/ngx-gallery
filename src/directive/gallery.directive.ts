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
  content: string;
  srcList: string[] = [];

  @Input() gallerize: string;

  constructor(public el: ElementRef, public renderer: Renderer2, public gallery: GalleryService) {
  }

  pluck(array: any[], field: string) {
    let s = [];
    for (let i = array.length; i--;) {
      s.push(array[i][field]);
    }

    return s.sort();
  }

  isEqual(array1: string[], array2: string[]) {
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
    let target = this.el.nativeElement;


    var updateGallery = () => {

      // skip if content is the same
      if (!target || (this.content && this.content === target.innerText)) {
        return;
      }
      else {
        this.content = target.innerText;
      }

      const images: GalleryImage[] = [];

      // get all img elements from content
      const imageElements = this.gallerize ? target.querySelectorAll(this.gallerize) : target.querySelectorAll(`img`);

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
