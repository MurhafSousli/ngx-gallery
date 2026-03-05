import { InjectionToken, Provider } from '@angular/core';
import { GalleryA11yOptions } from './a11y.model';
import { defaultOptions } from './a11y.default';


export const GALLERY_A11Y_OPTIONS: InjectionToken<GalleryA11yOptions> = new InjectionToken<GalleryA11yOptions>('GALLERY_A11Y_OPTIONS', {
  providedIn: 'root',
  factory: () => defaultOptions
});

export function provideGalleryA11yOptions(options: GalleryA11yOptions | false): Provider {
  return {
    provide: GALLERY_A11Y_OPTIONS,
    useValue: options === false ? null : { ...defaultOptions, ...options }
  }
}
