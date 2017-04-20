import {Component, Input, OnChanges, ElementRef, Renderer2, ChangeDetectionStrategy} from '@angular/core';
import { GalleryService } from '../../service/gallery.service';
import { GalleryState } from '../../service/gallery.state';

@Component({
  selector: 'gallery-text',
  templateUrl: './gallery-text.component.html',
  styleUrls: ['./gallery-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryTextComponent implements OnChanges {

  @Input() state: GalleryState;

  constructor(public gallery: GalleryService, private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnChanges() {
    // text config shortcut
    const config = this.gallery.config.description;

    // text overlay
    this.renderer.setStyle(this.el.nativeElement, 'position', (config.overlay) ? 'absolute' : 'relative');

    // text position
    if (config.position === 'top') {
      this.renderer.setStyle(this.el.nativeElement, 'order', 0);
      this.renderer.setStyle(this.el.nativeElement, 'top', 0);
      this.renderer.setStyle(this.el.nativeElement, 'bottom', 'unset');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'order', 2);
      this.renderer.setStyle(this.el.nativeElement, 'top', 'unset');
      this.renderer.setStyle(this.el.nativeElement, 'bottom', 0);
    }
  }
}
