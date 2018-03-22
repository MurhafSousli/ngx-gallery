import { ComponentRef, Inject, Injectable } from '@angular/core';

import { Gallery } from '@ngx-gallery/core';
import { LIGHTBOX_CONFIG } from './lightbox.token';
import { LightboxConfig } from './lightbox.model';
import { defaultConfig } from './lightbox.default';
import { LightboxComponent } from './lightbox.component';

import { Overlay } from '@angular/cdk/overlay';
import { OverlayRef } from '@angular/cdk/overlay';
import { OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LEFT_ARROW } from '@angular/cdk/keycodes';
import { RIGHT_ARROW } from '@angular/cdk/keycodes';
import { ESCAPE } from '@angular/cdk/keycodes';

@Injectable()
export class Lightbox {

  /** Gallery overlay ref */
  private _overlayRef: OverlayRef;

  /** Global config */
  private _config: LightboxConfig;

  constructor(@Inject(LIGHTBOX_CONFIG) config: LightboxConfig, private _gallery: Gallery, private _overlay: Overlay) {
    this._config = {...defaultConfig, ...config};
  }

  /**
   * Set Lightbox Config
   * @param config - LightboxConfig
   */
  setConfig(config: LightboxConfig) {
    this._config = {...this._config, ...config};
  }

  /**
   * Open Lightbox Overlay
   * @param i - Current Index
   * @param id - Gallery ID
   * @param config - Lightbox Config
   */
  open(i = 0, id = 'lightbox', config?: LightboxConfig) {

    const _config = config ? {...this._config, ...config} : this._config;

    const overlayConfig: OverlayConfig = {
      backdropClass: _config.backdropClass,
      panelClass: _config.panelClass,
      hasBackdrop: _config.hasBackdrop,
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
      scrollStrategy: this._overlay.scrollStrategies.block()
    };

    const galleryRef = this._gallery.ref(id);
    galleryRef.set(i);

    this._overlayRef = this._overlay.create(overlayConfig);

    /** Attach gallery to the overlay */
    const galleryPortal = new ComponentPortal(LightboxComponent);
    const lightboxRef: ComponentRef<LightboxComponent> = this._overlayRef.attach(galleryPortal);

    lightboxRef.instance.id = id;
    lightboxRef.instance.overlayRef = this._overlayRef;

    if (_config.hasBackdrop) {
      this._overlayRef.backdropClick().subscribe(() => this.close());
    }

    if (_config.keyboardShortcuts) {
      this._overlayRef.keydownEvents().subscribe((event) => {
        switch (event.keyCode) {
          case LEFT_ARROW:
            galleryRef.prev(id);
            break;
          case RIGHT_ARROW:
            galleryRef.next(id);
            break;
          case ESCAPE:
            this.close();
        }
      });
    }
  }

  /**
   * Close Lightbox Overlay
   */
  close() {
    if (this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }
  }
}
