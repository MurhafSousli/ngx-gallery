import { Directive, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { HttpClient, HttpEventType, HttpRequest, HttpEvent } from '@angular/common/http';
import { Subject, Observable, EMPTY } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';

@Directive({
  selector: '[lazyImage]'
})
export class LazyImage implements OnDestroy {

  private readonly _imageLoader$ = new Subject();

  @Input('lazyImage') set lazyImage(imagePath: string) {
    this.loadImage(imagePath);
  }

  @Output() progress = new EventEmitter<{ loaded: number, total: number }>();
  @Output() loaded = new EventEmitter<string>();
  @Output() error = new EventEmitter<Error>();

  constructor(private http: HttpClient) {
    this._imageLoader$.pipe(
      switchMap((imageSrc: string) => this.fetchImage(imageSrc))
    ).subscribe();
  }

  fetchImage(url: string): Observable<any> {
    const downloadImage = new HttpRequest('GET', url, {
      reportProgress: true,
      responseType: 'blob'
    });
    return this.http.request(downloadImage).pipe(
      tap((event: HttpEvent<string>) => {

        if (event.type === HttpEventType.DownloadProgress) {
          this.progress.emit({loaded: event.loaded, total: event.total});
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

  loadImage(imagePath: string) {
    this._imageLoader$.next(imagePath);
  }

  ngOnDestroy() {
    this._imageLoader$.complete();
  }

}
