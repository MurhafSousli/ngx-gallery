import { ChangeDetectionStrategy, Component, HostListener, Input, OnDestroy } from '@angular/core';
import { transition, state, trigger, style, animate } from '@angular/animations';
import { GalleryService } from '../../service/gallery.service';

@Component({
  selector: 'gallery-modal',
  templateUrl: './gallery-modal.component.html',
  styleUrls: ['./gallery-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('popup', [
      state('in', style({ opacity: 0.8 , transform: 'scale(0.2) translate3d(0, 100px, 0)'})),
      transition('void => *', [
        style({  opacity: 0.8 , transform: 'scale(0.2) translate3d(0, 100px, 0)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({  opacity: 1 , transform: 'scale(1)  translate3d(0, 0, 0)' }))
      ])
    ])]
})
export class GalleryModalComponent implements OnDestroy {

  @Input() closeButton = true;
  

  /** Activate keyboard for navigation */
  @HostListener('body:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    if (!this.gallery.state.getValue().active){
      return;
    }
    event.stopPropagation();
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

}
