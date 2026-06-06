import { GalleryA11yOptions } from './a11y.model';

export const defaultOptions: GalleryA11yOptions = {
  liveRegion: true,
  rangeLabel: (start: number, end: number, total: number) => {
    if (start === end) {
      return `Slide ${ start } of ${ total }`;
    }
    return `Slide ${ start } to ${ end } out of ${ total }`;
  },
  containerRole: 'region',
  containerLabel: 'Gallery',
  containerRoleDescription: 'carousel',
  thumbContainerRole: 'group',
  thumbContainerRoleDescription: 'carousel',
  thumbContainerLabel: 'Gallery thumbnails',
  itemRoleDescription: 'slide',
  itemLabel: (index: number, total: number) => `${ index + 1 } / ${ total }`,
  thumbRoleDescription: 'thumbnail',
  thumbLabel: (index: number) => `Go to slide ${ index + 1 }`,
  prevItemLabel: 'Go to previous slide',
  nextItemLabel: 'Go to next slide',
  firstItemLabel: 'Go to first slide',
  lastItemLabel: 'Go to last slide',
  lightboxLabel: 'Fullscreen view',
  lightboxCloseButtonLabel: 'Close gallery'
}
