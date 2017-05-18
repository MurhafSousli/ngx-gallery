import { Component, ElementRef, Input, OnInit, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { GalleryService } from '../../service/gallery.service';
import { GalleryState } from '../../service/gallery.state';
import { GalleryBulletConfig } from '../../config';

@Component({
  selector: 'gallery-bullets',
  templateUrl: './gallery-bullets.component.html',
  styleUrls: ['./gallery-bullets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryBulletsComponent implements OnInit {

  @Input() state: GalleryState;
  @Input() config: GalleryBulletConfig;

  constructor(public gallery: GalleryService, private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit() {
    if (this.config.position) {

      let contDirection, conWidth, conHeight, contTop;
      let hostRight = 'unset', hostBottom = 'unset';
      switch (this.config.position) {
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
          // top
          contDirection = 'row';
          conHeight = 'auto';
          conWidth = '100%';
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
