import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import { GalleryLoaderConfig } from '../../models';

@Component({
  selector: 'gallery-loader',
  template: `
    <div class="g-loader">
      <img #icon class="g-loader-img">
    </div>
  `,
  styleUrls: ['./gallery-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GalleryLoaderComponent implements OnInit {

  @Input() config: GalleryLoaderConfig;
  @ViewChild('icon') icon: ElementRef;

  constructor(public gallery: Gallery, private renderer: Renderer2) {
  }

  ngOnInit() {
    if (this.config.icon) {
      this.renderer.setProperty(this.icon.nativeElement, 'src', this.config.icon);
    }
    if (this.config.className) {
      this.renderer.addClass(this.icon.nativeElement, this.config.className);
    }
  }

}
