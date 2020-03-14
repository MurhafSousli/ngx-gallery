import { Directive, Input, Output, OnDestroy, SimpleChanges, OnChanges, EventEmitter, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject, Observable, Subscription, zip, fromEvent } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Directive({
  selector: '[lazyImage]'
})
export class LazyImage implements OnChanges, OnDestroy {

  private _imageLoader$ = new Subject<string>();
  private _loaderSub$ = Subscription.EMPTY;

  @Input('lazyImage') src: string;

  @Output() loaded = new EventEmitter<string>();
  @Output() error = new EventEmitter<Error>();

  constructor(@Inject(DOCUMENT) private document: any) {
    this._loaderSub$ = this._imageLoader$.pipe(
      switchMap((imageSrc: string) => this.nativeLoader(imageSrc))
    ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['src'] && changes['src'].previousValue !== changes['src'].currentValue) {
      this.loadImage(this.src);
    }
  }

  ngOnDestroy() {
    this._loaderSub$.unsubscribe();
    this._imageLoader$.complete();
  }

  loadImage(imagePath: string) {
    this._imageLoader$.next(imagePath);
  }

  /**
   * Native image loader, does not emit progress
   * @param url
   */
  nativeLoader(url: string): Observable<any> {
    const img = this.document.createElement('img');
    // Stop previously loading
    img.src = url;
    // Image load success
    const loadSuccess = fromEvent(img, 'load').pipe(
      tap(() => this.loaded.emit(url))
    );
    // Image load failed
    const loadError = fromEvent(img, 'error').pipe(
      tap(() => this.error.emit(new Error(`[lazyImage]: The image ${url} did not load`)))
    );
    return zip(loadSuccess, loadError);
  }

}
