import {
  Component,
  Input,
  Output,
  HostBinding,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { NgSwitch, NgSwitchCase, NgIf } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { animate, style, transition, trigger } from '@angular/animations';
import { imageFailedSvg } from './svg-assets';

@Component({
  selector: 'gallery-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition('* => success', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ],
  template: `
    <ng-container [ngSwitch]="state">
      <img [@fadeIn]="state"
           [src]="src"
           [attr.alt]="alt"
           [attr.loading]="loadingAttr"
           [style.visibility]="state === 'success' ? 'visible' : 'hidden'"
           class="g-image-item"
           (load)="state = 'success'; loaded.emit()"
           (error)="state = 'failed'; error.emit($event)"/>

      <div *ngSwitchCase="'failed'"
           class="g-image-error-message">
        <div *ngIf="errorTemplate; else defaultError"
             [innerHTML]="errorTemplate"></div>
        <ng-template #defaultError>
          <ng-container *ngIf="isThumbnail; else isLarge">
            <h4>
              <div class="gallery-thumb-error" [innerHTML]="errorSvg"></div>
            </h4>
          </ng-container>
          <ng-template #isLarge>
            <h2>
              <div class="gallery-image-error" [innerHTML]="errorSvg"></div>
            </h2>
            <p>Unable to load the image!</p>
          </ng-template>
        </ng-template>
      </div>

      <ng-container *ngSwitchCase="'loading'">
        <div *ngIf="loaderTemplate; else defaultLoader"
             class="g-loading"
             [innerHTML]="loaderTemplate">
        </div>
        <ng-template #defaultLoader>
          <div *ngIf="isThumbnail" class="g-thumb-loading"></div>
        </ng-template>
      </ng-container>
    </ng-container>
  `,
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgIf]
})

export class GalleryImageComponent implements OnInit {

  state: 'loading' | 'success' | 'failed' = 'loading';

  /** Progress value */
  progress: number = 0;

  /** Is thumbnail */
  @Input() isThumbnail: boolean;

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
  @Output() error = new EventEmitter<ErrorEvent>();

  @Output() loaded = new EventEmitter<void>();

  @HostBinding('attr.imageState') get imageState(): string {
    return this.state;
  }

  constructor(private _sanitizer: DomSanitizer) {
  }

  ngOnInit() {
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
