import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'lightbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  animations: [
    trigger('slideGalleryIn', [
      state('void', style({transform: 'translateY(25%) scale(0.9)', opacity: 0})),
      state('enter', style({transform: 'translateY(0%) scale(1)', opacity: 1})),
      state('exit', style({transform: 'translateY(25%)', opacity: 0})),
      transition('* => *', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
    ])
  ],
  template: `
    <gallery [@slideGalleryIn] [id]="id" [destroyRef]="false">
      <div class="g-btn-close" (tapClick)="close()"></div>
    </gallery>
  `
})
export class LightboxComponent implements OnDestroy {

  id: string;
  close: any;

  ngOnDestroy() {
    this.close();
  }
}
