import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import { GalleryService } from '../service/gallery.service';
import { GalleryImage } from '../service/gallery.state';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

@Directive({
  selector: '[gallerize]'
})
export class GalleryDirective implements OnInit {

  @Input() gallerize;

  constructor(public el: ElementRef, public renderer: Renderer2, public gallery: GalleryService) {
  }

  ngOnInit() {
    /** Gallerize on InnerHtml changes */
    console.log('dom changed');
    Observable.fromEvent(this.el.nativeElement, 'DOMSubtreeModified')
      .subscribe((e) => {
        if (this.el.nativeElement.innerHTML) {
          console.log('loaded', e);

          const images: GalleryImage[] = [];
          const classes = (this.gallerize) ? this.gallerize.split(' ').map((className) => '.' + className) : '';

          // get all img elements from content
          const imageElements = this.el.nativeElement.querySelectorAll(`img${classes}`);

          if (imageElements) {
            imageElements.forEach((img: HTMLImageElement, i) => {
              // add click event to open image in the lightbox
              this.renderer.setStyle(img, 'cursor', 'pointer');
              this.renderer.setProperty(img, 'onclick', () => {
                this.gallery.set(i);
              });

              // create an image item
              images.push({
                src: img.src,
                text: img.alt
              });
            });

            this.gallery.load(images);
          }
        }
      });

  }


}


/**

 ngOnChanges(changes: SimpleChanges) {

    if (changes['postContent'] && changes['postContent'].currentValue) {

      let html = changes['postContent'].currentValue;

      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', html);

      let classes = (this.gallerize) ? this.gallerize.split(' ').map((className) => '.' + className) : '';

      // get all img elements from content
      let images: GalleryImage[] = [];

      let imageElements = this.el.nativeElement.querySelectorAll(`img${classes}`);

      if (imageElements) {
        imageElements.forEach((img: HTMLImageElement, i) => {
          // add click event to open image in the lightbox

          img.onclick = () => {
            this.lightBoxService.setCurrent(i);
          };

          // create an image item
          images.push({
            src: img.src,
            text: 'This is a test for image description'
          });
        });


        this.lightBoxService.load(images);
      }
    }

  }
 */
