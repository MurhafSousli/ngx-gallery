import { Component, Input, OnInit, ElementRef, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { GalleryState } from '../../service/gallery.state';
import { GalleryDescriptionConfig } from '../../service/gallery.config';

@Component({
  selector: 'gallery-text',
  templateUrl: './gallery-text.component.html',
  styleUrls: ['./gallery-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryTextComponent implements OnInit {

  @Input() state: GalleryState;
  @Input() config: GalleryDescriptionConfig;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {

    // text overlay
    this.renderer.setStyle(this.el.nativeElement, 'position', (this.config.overlay) ? 'absolute' : 'relative');

    // text position
    if (this.config.position === 'top') {
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
