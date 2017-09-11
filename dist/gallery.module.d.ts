import { ModuleWithProviders, InjectionToken } from '@angular/core';
import { GalleryService } from './service/gallery.service';
import { GalleryConfig } from './config/gallery.config';
/** Initialize ConfigService with URL */
export declare function galleryFactory(config: GalleryConfig): GalleryService;
export declare const CONFIG: InjectionToken<GalleryConfig>;
export declare class GalleryModule {
    static forRoot(config?: GalleryConfig): ModuleWithProviders;
}
