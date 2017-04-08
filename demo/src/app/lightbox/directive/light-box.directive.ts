import { Directive, ElementRef, Renderer2, Input, SimpleChanges } from '@angular/core';
import { LightBoxService } from '../service/light-box.service';
import { LightBoxImage } from '../service/light-box.interface';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

@Directive({
  selector: '[lightBox]'
})
export class LightBoxDirective {

  @Input('lightBox') type: string;
  @Input() lbClasses;


  constructor(private el: ElementRef, private renderer: Renderer2, private lightBoxService: LightBoxService) {
  }

  ngOnInit() {

    if (typeof this.type === 'string' && this.type.toLowerCase() === 'html') {

      Observable.fromEvent(this.el.nativeElement, 'DOMSubtreeModified')
        .subscribe((e) => {
          if (this.el.nativeElement.innerHTML === null) return;
          console.log('loaded', e);

          let images: LightBoxImage[] = [];
          let classes = (this.lbClasses) ? this.lbClasses.split(' ').map((className) => '.' + className) : '';

          // get all img elements from content
          let imageElements = this.el.nativeElement.querySelectorAll(`img${classes}`);

          if (imageElements) {
            imageElements.forEach((img: HTMLImageElement, i) => {
              // add click event to open image in the lightbox
              this.renderer.setStyle(img, 'cursor', 'pointer');
              this.renderer.setProperty(img, 'onclick', () => {
                this.lightBoxService.setCurrent(i);
              });

              // create an image item
              images.push({
                src: img.src,
                text: img.alt
              });
            });


            this.lightBoxService.load(images);
          }
        });

    }

  }


}


/** 

  ngOnChanges(changes: SimpleChanges) {

    if (changes['postContent'] && changes['postContent'].currentValue) {

      let html = changes['postContent'].currentValue;

      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', html);

      let classes = (this.lbClasses) ? this.lbClasses.split(' ').map((className) => '.' + className) : '';

      // get all img elements from content
      let images: LightBoxImage[] = [];

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