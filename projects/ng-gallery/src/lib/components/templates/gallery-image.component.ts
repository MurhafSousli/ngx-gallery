import {
  Component,
  Input,
  Output,
  HostBinding,
  inject,
  EventEmitter,
  OnInit,
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
  animations: [
    trigger('fadeIn', [
      transition('* => success', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ],
  template: `
    @if (isThumbnail) {
      <img [@fadeIn]="state"
           [src]="src"
           [attr.alt]="alt"
           [attr.loading]="loadingAttr"
           [style.visibility]="state === 'success' ? 'visible' : 'hidden'"
           class="g-image-item"
           (load)="state = 'success'"
           (error)="state = 'failed'; error.emit($event)"/>
    } @else {
      <img [galleryImage]="index"
           [@fadeIn]="state"
           [src]="src"
           [attr.alt]="alt"
           [attr.loading]="loadingAttr"
           [style.visibility]="state === 'success' ? 'visible' : 'hidden'"
           class="g-image-item"
           (load)="state = 'success'"
           (error)="state = 'failed'; error.emit($event)"/>
    }
    @switch (state) {
      @case ('failed') {
        <div class="g-image-error-message">
          @if (errorTemplate) {
            <div [innerHTML]="errorTemplate"></div>
          } @else {
            @if (isThumbnail) {
              <h4>
                <div class="gallery-thumb-error" [innerHTML]="errorSvg"></div>
              </h4>
            } @else {
              <h2>
                <div class="gallery-image-error" [innerHTML]="errorSvg"></div>
              </h2>
              <p>Unable to load the image!</p>
            }
          }
        </div>
      }
      @case ('loading') {
        @if (loaderTemplate) {
          <div class="g-loading" [innerHTML]="loaderTemplate"></div>
        } @else if (isThumbnail) {
          <div class="g-thumb-loading"></div>
        }
      }
    }
  `,
  styleUrl: './gallery-image.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ImgRecognizer]
})

export class GalleryImageComponent implements OnInit {

  private _sanitizer: DomSanitizer = inject(DomSanitizer);

  state: ItemState = 'loading';

  /** Is thumbnail */
  @Input() isThumbnail: boolean;

  @Input() index: number;

  /** Image loading attribute */
  @Input() loadingAttr: 'eager' | 'lazy';

  /** Image alt */
  @Input() alt: string;

  /** Image source URL */
  @Input() src: string;

  /** Custom loader template */
  @Input() loadingIcon: string;
  /** Custom loader safe template */
  loaderTemplate: SafeHtml;

  /** Custom error template */
  @Input() loadingError: string;
  /** Custom error safe template */
  errorTemplate: SafeHtml;

  @Input() errorIcon: string = imageFailedSvg;
  errorSvg: SafeHtml;

  /** Stream that emits when an error occurs */
  @Output() error: EventEmitter<ErrorEvent> = new EventEmitter<ErrorEvent>();

  @HostBinding('attr.imageState') get imageState(): string {
    return this.state;
  }

  ngOnInit(): void {
    if (this.loadingIcon) {
      this.loaderTemplate = this._sanitizer.bypassSecurityTrustHtml(this.loadingIcon);
    }
    if (this.loadingError) {
      this.errorTemplate = this._sanitizer.bypassSecurityTrustHtml(this.loadingError);
    }
    if (this.errorIcon) {
      this.errorSvg = this._sanitizer.bypassSecurityTrustHtml(this.errorIcon);
    }
  }
}
