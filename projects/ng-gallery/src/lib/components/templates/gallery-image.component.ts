import {
  Component,
  inject,
  signal,
  output,
  computed,
  input,
  Signal,
  InputSignal,
  WritableSignal,
  OutputEmitterRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { animate, style, transition, trigger } from '@angular/animations';
import { imageFailedSvg } from './svg-assets';
import { ImgRecognizer } from '../../utils/img-recognizer';
import { ItemState } from './items.model';

@Component({
  standalone: true,
  selector: 'gallery-image',
  host: {
    '[attr.imageState]': 'state()'
  },
  animations: [
    trigger('fadeIn', [
      transition('* => success', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ],
  template: `
    @if (isThumbnail()) {
      <img [@fadeIn]="state()"
           [src]="src()"
           [attr.alt]="alt()"
           [attr.loading]="loadingAttr()"
           [style.visibility]="state() === 'success' ? 'visible' : 'hidden'"
           class="g-image-item"
           (load)="state.set('success')"
           (error)="state.set('failed'); error.emit($event)"/>
    } @else {
      <img [galleryImage]="index()"
           [@fadeIn]="state()"
           [src]="src()"
           [attr.alt]="alt()"
           [attr.loading]="loadingAttr()"
           [style.visibility]="state() === 'success' ? 'visible' : 'hidden'"
           class="g-image-item"
           (load)="state.set('success')"
           (error)="state.set('failed'); error.emit($event)"/>
    }
    @switch (state()) {
      @case ('failed') {
        <div class="g-image-error-message">
          @if (errorTemplate()) {
            <div [innerHTML]="errorTemplate()"></div>
          } @else {
            @if (isThumbnail()) {
              <h4>
                <div class="gallery-thumb-error" [innerHTML]="errorSvg()"></div>
              </h4>
            } @else {
              <h2>
                <div class="gallery-image-error" [innerHTML]="errorSvg()"></div>
              </h2>
              <p>Unable to load the image!</p>
            }
          }
        </div>
      }
      @case ('loading') {
        @if (loaderTemplate()) {
          <div class="g-loading" [innerHTML]="loaderTemplate()"></div>
        } @else if (isThumbnail()) {
          <div class="g-thumb-loading"></div>
        }
      }
    }
  `,
  styleUrl: './gallery-image.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ImgRecognizer]
})

export class GalleryImageComponent {

  private _sanitizer: DomSanitizer = inject(DomSanitizer);

  state: WritableSignal<ItemState> =  signal<ItemState>('loading');

  /** Is thumbnail */
  isThumbnail: InputSignal<boolean> = input<boolean>()

  index: InputSignal<number> = input<number>()

  /** Image loading attribute */
  loadingAttr: InputSignal<'eager' | 'lazy'> = input<'eager' | 'lazy'>();

  /** Image alt */
  alt: InputSignal<string> = input<string>()

  /** Image source URL */
  src: InputSignal<string> = input<string>()

  /** Custom loader template */
  loadingIcon: InputSignal<string> = input<string>();

  /** Custom error template */
  loadingError: InputSignal<string> = input<string>();

  /** Custom svg template */
  errorIcon: InputSignal<string> = input<string>(imageFailedSvg);

  /** Custom loader safe template */
  loaderTemplate: Signal<SafeHtml> = computed(() => this._sanitizer.bypassSecurityTrustHtml(this.loadingIcon()));

  /** Custom error safe template */
  errorTemplate: Signal<SafeHtml> = computed(() => this._sanitizer.bypassSecurityTrustHtml(this.loadingError()));

  /** Custom svg safe template */
  errorSvg: Signal<SafeHtml> = computed(() => this._sanitizer.bypassSecurityTrustHtml(this.errorIcon()));

  /** Stream that emits when an error occurs */
  error: OutputEmitterRef<ErrorEvent> = output<ErrorEvent>();

}
