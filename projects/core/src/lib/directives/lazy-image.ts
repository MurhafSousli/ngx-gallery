import { Directive, Input, Output, OnDestroy, SimpleChanges, OnChanges, EventEmitter, Inject } from '@angular/core';
import { HttpClient, HttpEventType, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, Subscription, zip, fromEvent, EMPTY } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[lazyImage]'
})
export class LazyImage implements OnChanges, OnDestroy {

  private _imageLoader$ = new Subject<string>();
  private _loaderSub$ = Subscription.EMPTY;

  @Input('lazyImage') src: string;

  @Input() mode: 'determinate' | 'indeterminate';

  @Output() progress = new EventEmitter<{ loaded: number, total: number }>();
  @Output() loaded = new EventEmitter<string>();
  @Output() error = new EventEmitter<Error>();

  constructor(
    private http: HttpClient,
    // Need to be declared as any
    // See https://github.com/angular/angular/issues/20351
    @Inject(DOCUMENT) private document: any
  ) {
    this._loaderSub$ = this._imageLoader$.pipe(
      switchMap((imageSrc: string) => this.mode === 'determinate' ? this.progressiveLoader(imageSrc) : this.nativeLoader(imageSrc))
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
   * Load image using HttpClient, This requires XHR access to the URL
   * @param url
   */
  progressiveLoader(url: string): Observable<any> {
    const downloadImage = new HttpRequest('GET', url, {
      reportProgress: true,
      responseType: 'blob',
      headers: new HttpHeaders({ 'CACHE_GALLERY_IMAGE': 'true' })
    });
    return this.http.request(downloadImage).pipe(
      tap((event: HttpEvent<string>) => {

        if (event.type === HttpEventType.DownloadProgress) {
          this.progress.emit({ loaded: event.loaded, total: event.total });
        }

        if (event.type === HttpEventType.Response) {
          this.loaded.emit(URL.createObjectURL(event.body));
        }

      }),
      catchError((err: Error) => {
        this.error.emit(err);
        return EMPTY;
      })
    );
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
