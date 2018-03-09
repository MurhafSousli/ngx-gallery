import { Inject, Injectable } from '@angular/core';

import { GalleryRef } from './gallery-ref';
import { GALLERY_CONFIG } from '../gallery.module';
import { defaultConfig } from '../utils/gallery.default';
import { GalleryConfig } from '../models';

@Injectable()
export class Gallery {

  /** Stores GalleryRef instances */
  private readonly _instances = {};

  /** Global config */
  config: GalleryConfig;

  constructor(@Inject(GALLERY_CONFIG) config: GalleryConfig) {
    this.config = {...defaultConfig, ...config};
  }

  /**
   * Returns Gallery by ID
   */
  ref(id = 'root', config?: GalleryConfig) {
    if (this._instances[id] instanceof GalleryRef) {
      return this._instances[id];
    } else {
      config = {...this.config, ...config};
      return this._instances[id] = new GalleryRef(config);
    }
  }

  destroy(id = 'root') {
    if (this._instances[id] instanceof GalleryRef) {
      this._instances[id].destroy();
      this._instances[id] = null;
    }
  }

  destroyAll() {
    Object.keys(this._instances)
      .map((key) => {
        this._instances[key].destory();
        this._instances[key] = null;
      });
  }

  resetAll() {
    Object.keys(this._instances)
      .map((id = 'root') => this._instances[id].gallery)
      .map((gallery: GalleryRef) => gallery.reset());
  }

}
