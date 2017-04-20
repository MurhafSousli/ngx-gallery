import {Component, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';
import {GalleryService} from '../../service/gallery.service';
import {GalleryState} from '../../service/gallery.state';

@Component({
  selector: 'gallery-bullets',
  templateUrl: './gallery-bullets.component.html',
  styleUrls: ['./gallery-bullets.component.scss']
})
export class GalleryBulletsComponent implements OnChanges {

  @Input() state: GalleryState;

  constructor(public gallery: GalleryService, private renderer: Renderer2, private el: ElementRef) {
  }

  /** TODO: set in ngOnInit */
  ngOnChanges() {
    if (this.gallery.config.bullets) {
      const config = this.gallery.config.bullets;

      let contDirection, conWidth, conHeight, contTop;
      let hostRight = 'unset', hostBottom = 'unset';
      if (config) {
        switch (config.position) {
          case 'top':
            contDirection = 'row';
            conHeight = 'auto';
            conWidth = '100%';
            break;
          case 'bottom':
            contDirection = 'row';
            conHeight = 'auto';
            conWidth = '100%';
            contTop = 'unset';
            hostBottom = '0';
            break;
          case 'left':
            contDirection = 'column';
            conWidth = 'auto';
            conHeight = '100%';
            break;
          case 'right':
            conWidth = 'auto';
            conHeight = '100%';
            contDirection = 'column';
            hostRight = '0';
            break;
          default:
            break;
        }

        this.renderer.setStyle(this.el.nativeElement, 'right', hostRight);
        this.renderer.setStyle(this.el.nativeElement, 'bottom', hostBottom);
        this.renderer.setStyle(this.el.nativeElement, 'width', conWidth);
        this.renderer.setStyle(this.el.nativeElement, 'height', conHeight);
        this.renderer.setStyle(this.el.nativeElement, 'flex-direction', contDirection);
      }
    }

  }

}
