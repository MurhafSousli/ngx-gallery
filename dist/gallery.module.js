import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService } from './service/gallery.service';
import { GalleryComponent } from './component/gallery/gallery.component';
import { GalleryNavComponent } from './component/gallery-nav/gallery-nav.component';
import { GalleryThumbComponent } from './component/gallery-thumb/gallery-thumb.component';
import { GalleryTextComponent } from './component/gallery-text/gallery-text.component';
import { GalleryImageComponent } from './component/gallery-image/gallery-image.component';
import { GalleryLoaderComponent } from './component/gallery-loader/gallery-loader.component';
import { GalleryModalComponent } from './component/gallery-modal/gallery-modal.component';
import { GalleryBulletsComponent } from './component/gallery-bullets/gallery-bullets.component';
import { GalleryPlayerComponent } from './component/gallery-player/gallery-player.component';
import { GalleryMainComponent } from './component/gallery-main/gallery-main.component';
import { GalleryDirective } from './directive/gallery.directive';
import { LazyDirective } from './directive/lazy.directive';
import { TapDirective } from './directive/tap.directive';
/** Initialize ConfigService with URL */
export function galleryFactory(config) {
    return new GalleryService(config);
}
export var CONFIG = new InjectionToken('config');
var GalleryModule = (function () {
    function GalleryModule() {
    }
    GalleryModule.forRoot = function (config) {
        return {
            ngModule: GalleryModule,
            providers: [
                { provide: CONFIG, useValue: config },
                {
                    provide: GalleryService,
                    useFactory: galleryFactory,
                    deps: [CONFIG]
                }
            ]
        };
    };
    return GalleryModule;
}());
export { GalleryModule };
GalleryModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    GalleryComponent,
                    GalleryNavComponent,
                    GalleryThumbComponent,
                    GalleryDirective,
                    GalleryTextComponent,
                    GalleryImageComponent,
                    GalleryLoaderComponent,
                    GalleryModalComponent,
                    GalleryBulletsComponent,
                    GalleryPlayerComponent,
                    GalleryMainComponent,
                    TapDirective,
                    LazyDirective
                ],
                exports: [
                    GalleryComponent,
                    GalleryDirective,
                    GalleryModalComponent
                ]
            },] },
];
/** @nocollapse */
GalleryModule.ctorParameters = function () { return []; };
//# sourceMappingURL=gallery.module.js.map