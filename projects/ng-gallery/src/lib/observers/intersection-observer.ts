import { NgZone } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

export function createIntersectionObserver(options: IntersectionObserverInit, elements: Element[], zone: NgZone): Observable<IntersectionObserverEntry[]> {
  return new Observable((obs: Subscriber<IntersectionObserverEntry[]>) => {
    zone.runOutsideAngular(() => {
      const io: IntersectionObserver = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => obs.next(entries),
        options
      );
      elements.forEach((element: HTMLElement) => io.observe(element));
      return () => {
        elements.forEach((element: HTMLElement) => io.unobserve(element));
        io.disconnect();
      };
    });
  });
}

