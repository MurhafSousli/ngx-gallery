import { InjectionToken, Provider, Signal } from '@angular/core';
import { defaultOptions } from '../gallery.default';
import { GalleryOptions } from './config.model';

export const GALLERY_OPTIONS: InjectionToken<GalleryOptions> = new InjectionToken<GalleryOptions>('GALLERY_OPTIONS', {
  providedIn: 'root',
  factory: () => defaultOptions
});

export function provideGalleryOptions(options: GalleryOptions): Provider {
  return {
    provide: GALLERY_OPTIONS,
    useValue: { ...defaultOptions, ...options }
  }
}

export const GALLERY_INITIAL_INDEX = new InjectionToken<Signal<number>>('GALLERY_INITIAL_INDEX');
