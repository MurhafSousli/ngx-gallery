import { Observable, Subscriber, mergeMap } from 'rxjs';

export function resizeObservable(el: HTMLElement, setter?: (ref: ResizeObserver) => void): Observable<ResizeObserverEntry> {
  return new Observable((subscriber: Subscriber<ResizeObserverEntry[]>) => {
    const resizeObserver: ResizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => subscriber.next(entries));
    resizeObserver.observe(el);
    if (setter) {
      setter(resizeObserver);
    }
    return () => resizeObserver.disconnect();
  }).pipe(
    mergeMap((entries: ResizeObserverEntry[]) => entries)
  );
}

