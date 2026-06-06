import { Signal, } from '@angular/core';
import { GalleryDock } from '../models/config.model';

export abstract class GalleryThumbContext {
  abstract floating: Signal<boolean>;
  abstract position: Signal<GalleryDock>;
}
