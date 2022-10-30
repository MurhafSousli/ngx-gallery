import { Observable, Subscriber } from 'rxjs';

export function resizeObservable(el: HTMLElement): Observable<ResizeObserverEntry[]> {
  return new Observable((subscriber: Subscriber<ResizeObserverEntry[]>) => {
    const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => subscriber.next(entries));
    resizeObserver.observe(el);
    return function unsubscribe() {
      resizeObserver.disconnect();
    };
  });
}
