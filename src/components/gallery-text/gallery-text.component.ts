import {
  Component,
  Input,
  OnInit,
  ElementRef,
  Renderer2,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import { GalleryState, GalleryDescConfig } from '../../models';

@Component({
  selector: 'gallery-text',
  templateUrl: './gallery-text.component.html',
  styleUrls: ['./gallery-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GalleryTextComponent implements OnInit {

  @Input() state: GalleryState;
  @Input() config: GalleryDescConfig;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    const el = this.el.nativeElement;
    /** text overlay */
    if (this.config.overlay) {
      this.renderer.setStyle(el, 'position', 'absolute');
    }

    /** text position */
    if (this.config.position === 'top') {
      this.renderer.setStyle(el, 'order', 0);
      this.renderer.setStyle(el, '-webkit-order', 0);
      this.renderer.setStyle(el, 'top', 0);
      this.renderer.setStyle(el, 'bottom', 'unset');
    } else {
      this.renderer.setStyle(el, 'order', 2);
      this.renderer.setStyle(el, '-webkit-order', 2);
      this.renderer.setStyle(el, 'top', 'unset');
      this.renderer.setStyle(el, 'bottom', 0);
    }
  }
}
