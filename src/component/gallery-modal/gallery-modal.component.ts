import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnDestroy, ViewChild } from '@angular/core';
import { GalleryService } from '../../service/gallery.service';
import { GalleryMainComponent } from '../gallery-main/gallery-main.component';

@Component({
  selector: 'gallery-modal',
  templateUrl: './gallery-modal.component.html',
  styleUrls: ['./gallery-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryModalComponent implements OnDestroy {

  @ViewChild(GalleryMainComponent, { read: ElementRef }) galleryBase: ElementRef;
  @Input() closeButton = true;

  /** Activate keyboard for navigation */
  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 37:  // prev
        this.gallery.prev();
        break;
      case 39:  // next
        this.gallery.next();
        break;
      case 13:  // enter
        this.gallery.next();
        break;
      case 27:  // esc
        this.gallery.close();
        break;
      default:
        return;
    }
  }

  constructor(public gallery: GalleryService) {
  }

  ngOnDestroy() {
    this.gallery.reset();
  }

  /** positioning close button */
  // getCloseStyle() {
  //
  //   if (this.galleryBase) {
  //     const left = this.galleryBase.nativeElement.offsetLeft + this.galleryBase.nativeElement.offsetWidth - 15;
  //     const top = this.galleryBase.nativeElement.offsetTop - 15;
  //
  //     return {
  //       top: `${top}px`,
  //       left: `${left}px`,
  //       visibility: 'visible'
  //     };
  //   }
  // }

}
