// import { Directive, Inject, Input, Output, OnChanges, OnDestroy, SimpleChanges, NgZone, ElementRef, EventEmitter } from '@angular/core';
// import { DOCUMENT } from '@angular/common';
// import { Observable, Subscription, fromEvent, switchMap, take, takeUntil, tap } from 'rxjs';
// import { SliderAdapter } from '../components/adapters';
// import { GalleryConfig } from '../models/config.model';
// import { GalleryState } from '../models/gallery.model';
//
// @Directive({
//   selector: '[mouseSliding]',
//   standalone: true
// })
// export class MouseSliding implements OnChanges, OnDestroy {
//
//   private _currentSubscription: Subscription;
//
//   get _viewport(): HTMLElement {
//     return this._el.nativeElement;
//   }
//
//   @Input('mouseSliding') galleryId: string;
//
//   @Input() items: HTMLElement[];
//
//   @Input() adapter: SliderAdapter;
//
//   @Input() state: GalleryState;
//
//   @Input() config: GalleryConfig;
//
//   @Output() activeIndexChange: EventEmitter<number> = new EventEmitter<number>();
//
//   constructor(@Inject(DOCUMENT) private _document: Document,
//               private _zone: NgZone,
//               private _el: ElementRef<HTMLElement>) {
//   }
//
//
//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes.config && changes.config.currentValue?.mouseScrollDisabled !== changes.config.previousValue?.mouseScrollDisabled) {
//       changes.config.currentValue.mouseScrollDisabled ? this._unsubscribe() : this._subscribe();
//     }
//   }
//
//   ngOnDestroy(): void {
//     this._unsubscribe();
//   }
//
//   private _subscribe(): void {
//     this._unsubscribe();
//
//     this._zone.runOutsideAngular(() => {
//       this._currentSubscription = this.dragEvent().subscribe();
//     });
//   }
//
//   private _unsubscribe(): void {
//     this._currentSubscription?.unsubscribe();
//   }
//
//   private dragEvent(): Observable<any> {
//     const mouseDown$: Observable<MouseEvent> = fromEvent<MouseEvent>(this._viewport, 'mousedown');
//     const mouseUp$: Observable<MouseEvent> = fromEvent<MouseEvent>(this._document, 'mouseup');
//     const mouseMove$: Observable<MouseEvent> = fromEvent<MouseEvent>(this._document, 'mousemove', {
//       capture: true,
//       passive: true
//     });
//
//     let offset: number;
//     let velocity: number;
//
//     const dragStart: Observable<MouseEvent> = mouseDown$.pipe(
//       tap((downEvent: MouseEvent) => {
//         downEvent.preventDefault();
//         offset = this.adapter.scrollValue;
//         this._viewport.style.scrollSnapType = 'unset';
//         this._viewport.classList.add('g-sliding');
//         this._document.onselectstart = () => false;
//       })
//     );
//
//     const dragEnd: Observable<MouseEvent> = mouseUp$.pipe(
//       tap((upEvent: MouseEvent) => {
//         this._document.onselectstart = null;
//         this._viewport.classList.remove('g-sliding');
//         const index: number = this.getIndexOnMouseUp(velocity);
//         this._zone.run(() => this.activeIndexChange.emit(index));
//       }),
//       take(1)
//     );
//
//     return dragStart.pipe(
//       switchMap((startEvent: MouseEvent) => {
//         return mouseMove$.pipe(
//           tap((moveEvent: MouseEvent) => {
//             const start: number = this.adapter.getDraggingProperty(startEvent);
//             const current: number = this.adapter.getDraggingProperty(moveEvent);
//             const deltaTime: number = moveEvent.timeStamp - startEvent.timeStamp;
//             const delta: number = current - start;
//             velocity = delta / deltaTime;
//             this._viewport.scrollTo(this.adapter.getDraggingValue(offset, delta, 'auto'));
//           }),
//           takeUntil(dragEnd)
//         );
//       })
//     );
//   }
//
//   private getIndexOnMouseUp(velocity: number): number {
//     // Check if scrolled item is great enough to navigate
//     const currElement: Element = this.items[this.state.currIndex];
//
//     // Find the gallery item element in the center elements
//     const elementAtCenter: Element = this.getElementFromViewportCenter();
//
//     // Check if center item can be taken from element using
//     if (elementAtCenter && elementAtCenter !== currElement) {
//       return +elementAtCenter.getAttribute('galleryIndex');
//     }
//
//     // Check if velocity is great enough to navigate
//     if (Math.abs(velocity) > 0.3) {
//       return velocity > 0 ? this.state.currIndex - 1 : this.state.currIndex + 1;
//     }
//
//     // Reset position to the current index
//     return -1;
//   }
//
//   private getElementFromViewportCenter(): Element {
//     // Get slider position relative to the document
//     const sliderRect: DOMRect = this._viewport.getBoundingClientRect();
//     // Try look for the center item using `elementsFromPoint` function
//     const centerElements: Element[] = this._document.elementsFromPoint(
//       sliderRect.x + (sliderRect.width / 2),
//       sliderRect.y + (sliderRect.height / 2)
//     );
//     // Find the gallery item element in the center elements
//     return centerElements.find((element: Element) => {
//       return element.getAttribute('galleryId') === this.galleryId;
//     });
//   }
// }
