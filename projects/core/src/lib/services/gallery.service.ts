import { Inject, Injectable } from '@angular/core';

import { GalleryRef } from './gallery-ref';
import { GALLERY_CONFIG } from '../utils/gallery.token';
import { defaultConfig } from '../utils/gallery.default';
import { GalleryConfig } from '../models';

@Injectable({
  providedIn: 'root'
})
export class Gallery {

  /** Stores GalleryRef instances */
  private readonly _instances = {};

  /** Global config */
  config: GalleryConfig;

  constructor(@Inject(GALLERY_CONFIG) config: GalleryConfig) {
    this.config = {...defaultConfig, ...config};
  }

  /** Checks if gallery exists */
  hasRef(id = 'root'): boolean {
    return this._instances[id] instanceof GalleryRef;
  }

  /** Returns Gallery by ID */
  ref(id = 'root', config?: GalleryConfig): GalleryRef {
    if (this.hasRef(id)) {
      if (config) {
        this._instances[id].setConfig({...this.config, ...config});
      }
      return this._instances[id];
    } else {
      return this._instances[id] = new GalleryRef({...this.config, ...config});
    }
  }

  /** Destroy a gallery instance */
  destroy(id = 'root') {
    if (this.hasRef(id)) {
      this._instances[id].destroy();
      this._instances[id] = null;
    }
  }

  /** Destroy all gallery instances */
  destroyAll() {
    Object.keys(this._instances)
      .map((key) => {
        this._instances[key].destory();
        this._instances[key] = null;
      });
  }

  /** Reset all gallery instances */
  resetAll() {
    Object.keys(this._instances)
      .map((id = 'root') => this._instances[id].gallery)
      .map((gallery: GalleryRef) => gallery.reset());
  }

}
