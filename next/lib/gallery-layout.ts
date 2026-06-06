import { Directive, computed, contentChild, contentChildren, Signal } from '@angular/core';
import { GalleryNav } from './nav/gallery-nav';
import { GalleryPosition } from './models/config.model';
import { GallerySlot } from './directives/gallery-slot';
import { GalleryThumbContext } from './thumbs/gallery-thumb.token';

/**
 * @internal
 */
@Directive({
  host: {
    '[style.grid-template]': 'gridTemplate()'
  },
  selector: '[galleryLayout]'
})
export class GalleryLayoutDirective {

  /* v8 ignore start */
  private readonly galleryNav: Signal<GalleryNav> = contentChild(GalleryNav);

  private readonly galleryThumbs: Signal<readonly GalleryThumbContext[]> = contentChildren(GalleryThumbContext);

  private readonly slots: Signal<readonly GallerySlot[]> = contentChildren(GallerySlot);
  /* v8 ignore stop */

  /** 1. Identify which docks are occupied by non-floating elements */
  private readonly occupiedDocks: Signal<Set<GalleryPosition>> = computed(() => {
    const active: Set<GalleryPosition> = new Set<GalleryPosition>();

    this.slots().forEach(b => b.position() !== 'center' && active.add(b.position()));

    this.galleryThumbs().forEach(t => !t.floating() && active.add(t.position()));

    this.galleryNav()?.buttons().forEach(b => b.position() !== 'center' && active.add(b.position()));

    return active;
  });

  readonly gridTemplate: Signal<string> = computed(() => {
    const d: Set<GalleryPosition> = this.occupiedDocks();
    const hasStart = d.has('start');
    const hasEnd = d.has('end');

    // 1. Column Definition
    const columns: string[] = [
      ...(hasStart ? ['auto'] : []),
      'minmax(0, 1fr)',
      ...(hasEnd ? ['auto'] : [])
    ];

    const colCount = columns.length;

    // 2. Optimized Row Builder
    // If 'content' is a string, we repeat it across all columns (Full Width)
    // If 'content' is an object, we map specific slots
    const createRow = (content: string | { start?: string, center?: string, end?: string }, height: string) => {
      let rowContent: string;

      if (typeof content === 'string') {
        // Repeat the name (e.g., "bottom bottom bottom") to span all columns
        rowContent = Array(colCount).fill(content).join(' ');
      } else {
        const cells: string[] = [];
        if (hasStart) cells.push(content.start || '.');
        cells.push(content.center || '.');
        if (hasEnd) cells.push(content.end || '.');
        rowContent = cells.join(' ');
      }

      return `"${ rowContent }" ${ height }`;
    };

    const rows: string[] = [];

    // 3. Construct Rows
    if (d.has('top')) {
      // Pass the string "top" to trigger full-width spanning
      rows.push(createRow('top', 'auto'));
    }

    // Center row (Mixed content)
    rows.push(createRow({
      start: 'start',
      center: 'center',
      end: 'end'
    }, 'minmax(0, 1fr)'));

    if (d.has('bottom')) {
      // Pass the string "bottom" to trigger full-width spanning
      rows.push(createRow('bottom', 'auto'));
    }

    return `${ rows.join('\n') } / ${ columns.join(' ') }`;
  });
}
