import { Observable, Subscriber, mergeMap, filter, map } from 'rxjs';

// export class ActiveItemObserver {
//
//   observe(root: HTMLElement, elements: HTMLElement[], rootMargin: string): Observable<number> {
//     return createIntersectionObserver(root, elements, rootMargin).pipe(
//       map((entry: IntersectionObserverEntry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('g-item-highlight');
//           return +entry.target.getAttribute('galleryIndex');
//         } else {
//           entry.target.classList.remove('g-item-highlight');
//           return -1;
//         }
//       }),
//       filter((index: number) => index !== -1)
//     );
//   }
// }

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
    // .pipe(
    // mergeMap((entries: IntersectionObserverEntry[]) => entries)
  // );
}

