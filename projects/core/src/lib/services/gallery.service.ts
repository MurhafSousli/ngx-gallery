import { Inject, Injectable } from '@angular/core';

import { GalleryRef } from './gallery-ref';
import { GALLERY_CONFIG } from '../utils/gallery.token';
import { defaultConfig } from '../utils/gallery.default';
import { GalleryConfig } from '../models';

@Injectable({
  providedIn: 'root'
})
export class Gallery {

  /** Store gallery instances */
  private readonly _instances = new Map<string, GalleryRef>();

  /** Global config */
  config: GalleryConfig;

  constructor(@Inject(GALLERY_CONFIG) config: GalleryConfig) {
    this.config = {...defaultConfig, ...config};
  }

  /**
   * Get or create gallery by ID
   * @param id
   * @param config
   */
  ref(id = 'root', config?: GalleryConfig): GalleryRef {
    if (this._instances.has(id)) {
      const galleryRef = this._instances.get(id);
      if (config) {
        galleryRef.setConfig({...this.config, ...config});
      }
      return galleryRef;
    } else {
      return this._instances.set(id, new GalleryRef({...this.config, ...config}, this.deleteInstance(id))).get(id);
    }
  }

  /**
   * Destroy all gallery instances
   */
  destroyAll() {
    this._instances.forEach((ref: GalleryRef) => ref.destroy());
  }

  /**
   * Reset all gallery instances
   */
  resetAll() {
    this._instances.forEach((ref: GalleryRef) => ref.reset());
  }

  /**
   * A destroyer function for each gallery instance
   */
  private deleteInstance(id: string) {
    return () => {
      if (this._instances.has(id)) {
        this._instances.delete(id);
      }
    };
  }

}
