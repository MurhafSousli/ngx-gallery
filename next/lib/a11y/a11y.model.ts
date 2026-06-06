export interface GalleryA11yOptions {
  /** Enables/disables live region announcements (should be disabled in autoplay) */
  liveRegion?: boolean;
  /** Callback to generate the range label (e.g., 'Item 1 to 5 of 20') */
  rangeLabel?: (start: number, end: number, total: number) => string;
  /** ARIA role for the gallery container */
  containerRole?: string;
  /** ARIA label for the gallery container */
  containerLabel?: string;
  /** ARIA role description for the gallery container */
  containerRoleDescription?: string;
  /** Callback to generate the ARIA label for each gallery item */
  itemLabel?: (index: number, total: number) => string;
  /** ARIA role for each gallery item */
  itemRole?: string;
  /** ARIA role description for each gallery item */
  itemRoleDescription?: string;
  /** ARIA label for the thumbnails container */
  thumbContainerLabel?: string;
  /** ARIA role for the thumbnails container */
  thumbContainerRole?: string;
  /** ARIA role description for the thumbnails container */
  thumbContainerRoleDescription?: string;
  /** Callback to generate the ARIA label for each thumbnail item */
  thumbLabel?: (index: number, total: number) => string;
  /** ARIA role for each thumbnail item */
  thumbRole?: string;
  /** ARIA role description for each thumbnail item */
  thumbRoleDescription?: string;
  /** ARIA label for screen readers for previous button */
  prevItemLabel?: string;
  /** ARIA label for screen readers for next button */
  nextItemLabel?: string;
  /** ARIA label for screen readers for previous button when swiper is on first slide */
  firstItemLabel?: string;
  /** ARIA label for screen readers for next button when swiper is on last slide */
  lastItemLabel?: string;
  /** ARIA label for screen readers for the lightbox dialog */
  lightboxLabel?: string;
  /** ARIA label for screen readers for the lightbox close button */
  lightboxCloseButtonLabel?: string;
}
