import { Component, input, InputSignal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  host: {
    '[class.is-bar]': 'mode() === "progressbar"'
  },
  selector: 'gallery-autoplay',
  template: `
    @if (mode() === 'spinner') {
      <div class="g-spinner">
        <svg viewBox="0 0 38 38">
          <circle class="g-spinner-track" cx="19" cy="19" r="15.915"/>
          <circle class="g-spinner-fill" cx="19" cy="19" r="15.915"/>
        </svg>
      </div>
    } @else {
      <div class="g-progressbar" role="progressbar">
        <div class="g-progressbar-fill"></div>
      </div>
    }
  `,
  styleUrl: 'gallery-autoplay-ui.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryAutoplayUI {

  mode: InputSignal<'spinner' | 'progressbar'> = input<'spinner' | 'progressbar'>('spinner');

}
