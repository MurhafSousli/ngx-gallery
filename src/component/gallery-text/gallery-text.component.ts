import {Component, Input, OnInit, ElementRef, Renderer2, ChangeDetectionStrategy} from '@angular/core';
import {GalleryState} from '../../service/gallery.state';
import {GalleryDescConfig} from '../../config';

@Component({
  selector: 'gallery-text',
  templateUrl: './gallery-text.component.html',
  styleUrls: ['./gallery-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryTextComponent implements OnInit {

  @Input() state: GalleryState;
  @Input() config: GalleryDescConfig;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    const el = this.el.nativeElement;
    // text overlay
    if (this.config.overlay) {
      this.renderer.setStyle(el, 'position', 'absolute');
    }

    // text position
    if (this.config.position === 'top') {
      this.renderer.setStyle(el, 'order', 0);
      this.renderer.setStyle(el, 'top', 0);
      this.renderer.setStyle(el, 'bottom', 'unset');
    } else {
      this.renderer.setStyle(el, 'order', 2);
      this.renderer.setStyle(el, 'top', 'unset');
      this.renderer.setStyle(el, 'bottom', 0);
    }
  }
}
