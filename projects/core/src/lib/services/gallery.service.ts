import { Inject, Injectable } from '@angular/core';

import { GalleryRef } from './gallery-ref';
import { GALLERY_CONFIG } from '../utils/gallery.token';
import { defaultConfig } from '../utils/gallery.default';
import { GalleryConfig } from '../models';

@Injectable()
export class Gallery {

  /** Stores GalleryRef instances */
  private readonly _instances = new Map<string, GalleryRef>();

  /** Global config */
  config: GalleryConfig;

  constructor(@Inject(GALLERY_CONFIG) config: GalleryConfig) {
    this.config = {...defaultConfig, ...config};
  }

  /** Returns Gallery by ID */
  ref(id = 'root', config?: GalleryConfig): GalleryRef {
    if (this._instances.has(id)) {
      const galleryRef = this._instances.get(id);
      if (config) {
        galleryRef.setConfig({...this.config, ...config});
      }
      return galleryRef;
    } else {
      return this._instances.set(id, new GalleryRef({...this.config, ...config})).get(id);
    }
  }

  /** Destroy a gallery instance */
  destroy(id = 'root') {
    if (this._instances.has(id)) {
      this._instances.get(id).destroy();
      this._instances.delete(id);
    }
  }

  /** Destroy all gallery instances */
  destroyAll() {
    this._instances.forEach((ref: GalleryRef, id: string) => {
      ref.destroy();
      this._instances.delete(id);
    });
  }

  /** Reset all gallery instances */
  resetAll() {
    this._instances.forEach((ref: GalleryRef) => ref.reset());
  }

}
