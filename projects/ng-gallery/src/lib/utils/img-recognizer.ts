import { Directive, Input, HostListener, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ImgManager } from './img-manager';
import { GalleryItemComponent } from '../components/gallery-item.component';

@Directive({
  selector: 'img[galleryImage]',
  standalone: true
})
export class ImgRecognizer implements OnInit, OnDestroy {

  @Input('galleryImage') index: number;

  @HostListener('load', ['$event'])
  onLoad() {
    this.item.state$.next('success');
  }

  @HostListener('error', ['$event'])
  onError() {
    this.item.state$.next('failed');
  }

  constructor(private el: ElementRef<HTMLImageElement>, private manager: ImgManager, private item: GalleryItemComponent) {
    if (item) {
      // Mark the gallery-item component as an image item
      item.isItemContainImage = true;
    } else {
      throw new Error('[NgGallery]: galleryImage directive should be only used inside gallery item templates!')
    }
  }

  ngOnInit(): void {
    this.manager.addItem(this.index, {
      state: this.item.state$.asObservable(),
      target: this.el.nativeElement
    });
  }

  ngOnDestroy(): void {
    this.manager.deleteItem(this.index);
  }
}
