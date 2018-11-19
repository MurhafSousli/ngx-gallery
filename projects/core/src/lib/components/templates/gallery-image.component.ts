import { Component, Input, HostBinding, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle } from '@angular/platform-browser';
import { animate, style, transition, trigger } from '@angular/animations';
import { animationFrameScheduler, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'gallery-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: 0}),
        animate('300ms ease-in', style({opacity: 1}))
      ])
    ])
  ],
  template: `
    <ng-container [lazyImage]="src"
                  [mode]="mode"
                  (progress)="onProgress($event)"
                  (loaded)="onLoaded($event)"
                  (error)="onError($event)"
                  [ngSwitch]="state | async">

      <div *ngSwitchCase="'success'"
           @fadeIn
           class="g-image-item"
           [style.backgroundImage]="imageUrl">
      </div>

      <div *ngSwitchCase="'failed'"
           class="g-image-error-message">
        <div *ngIf="errorTemplate; else defaultError"
             [innerHTML]="errorTemplate"></div>
        <ng-template #defaultError>
          <ng-container *ngIf="!isThumbnail; else isLarge">
            <h2>⚠</h2>
            <p>Unable to load the image!</p>
          </ng-container>
          <ng-template #isLarge>
            <h4>⚠</h4>
          </ng-template>
        </ng-template>
      </div>

      <ng-container *ngSwitchCase="'loading'">
        <div *ngIf="isThumbnail; else isLarge" class="g-thumb-loading"></div>
        <ng-template #isLarge>
          <div class="g-loading">
            <i *ngIf="loaderTemplate; else progressLoader"
               [innerHTML]="loaderTemplate"></i>
          </div>
          <ng-template #progressLoader>
            <radial-progress [value]="progress" [mode]="mode"></radial-progress>
          </ng-template>
        </ng-template>
      </ng-container>
    </ng-container>
  `
})

export class GalleryImageComponent implements OnInit {

  /** Stream that emits the state */
  readonly state = new BehaviorSubject<'loading' | 'success' | 'failed'>('loading');

  /** Progress value */
  progress = 0;

  /** Image loader mode */
  @Input() mode: 'determinate' | 'indeterminate' = 'determinate';

  /** Is thumbnail */
  @Input() isThumbnail: boolean;

  /** Image source URL */
  @Input() src: string;
  /** Loaded image URL */
  imageUrl: SafeStyle;

  /** Custom loader template */
  @Input() loadingIcon: string;
  /** Custom loader safe template */
  loaderTemplate: SafeHtml;

  /** Custom error template */
  @Input() loadingError: string;
  /** Custom error safe template */
  errorTemplate: SafeHtml;

  /** Stream that emits when an error occurs */
  @Output() error = new EventEmitter<Error>();
  /** loading error */
  loadError: Error;

  @HostBinding('class.g-image-loaded') get imageLoadSuccess(): boolean {
    return !!this.imageUrl;
  }

  @HostBinding('class.g-image-error') get imageLoadFailed(): boolean {
    return !!this.loadError;
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
  }

  onProgress({loaded, total}: { loaded: number, total: number }) {
    this.progress = loaded * 100 / total;
  }

  onLoaded(blobUrl: string) {
    this.imageUrl = this._sanitizer.bypassSecurityTrustStyle(`url(${blobUrl})`);
    animationFrameScheduler.schedule(() => this.state.next('success'));
  }

  onError(err: Error) {
    this.loadError = err;
    animationFrameScheduler.schedule(() => this.state.next('failed'));
    this.error.emit(err);
  }

}
