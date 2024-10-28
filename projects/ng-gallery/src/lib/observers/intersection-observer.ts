import { Observable, Subscriber } from 'rxjs';

export function createIntersectionObserver(options: IntersectionObserverInit, elements: Element[]): Observable<IntersectionObserverEntry[]> {
  return new Observable((observer: Subscriber<IntersectionObserverEntry[]>) => {
    const intersectionObserver: IntersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => observer.next(entries),
      options
    );
    elements.forEach((element: HTMLElement) => intersectionObserver.observe(element));
    return () => {
      elements.forEach((element: HTMLElement) => intersectionObserver.unobserve(element));
      intersectionObserver.disconnect();
    };
  });
}

