import { inject, Injectable } from '@angular/core';

import { GalleryRef } from './gallery-ref';
import { GalleryConfig, GALLERY_CONFIG } from '../models/config.model';

@Injectable({
  providedIn: 'root'
})
export class Gallery {

  /** Store gallery instances */
  private readonly _instances = new Map<string, GalleryRef>();

  /** Global config */
  config: GalleryConfig = inject(GALLERY_CONFIG);

  /**
   * Get or create gallery by ID
   * @param id
   * @param config
   */
  ref(id = 'root', config?: GalleryConfig): GalleryRef {
    // if (this._instances.has(id)) {
    //   const galleryRef: GalleryRef = this._instances.get(id);
    //   if (config) {
    //     galleryRef.setConfig(config);
    //   }
    //   return galleryRef;
    // } else {
    //   return this._instances.set(id, new GalleryRef({ ...this.config, ...config }, this.deleteInstance(id))).get(id);
    // }
    return null;
  }

  /**
   * Destroy all gallery instances
   */
  destroyAll() {
    // this._instances.forEach((ref: GalleryRef) => ref.destroy());
  }

  /**
   * Reset all gallery instances
   */
  resetAll() {
    this._instances.forEach((ref: GalleryRef) => ref.reset());
  }

  /**
   * Logger for debugging
   */
  debugConsole(...data: any[]): void {
    if (this.config.debug) {
      console.log(...data)
    }
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
