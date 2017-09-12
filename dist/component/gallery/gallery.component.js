import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GalleryService } from '../../service/gallery.service';
var GalleryComponent = (function () {
    function GalleryComponent(gallery) {
        this.gallery = gallery;
    }
    GalleryComponent.prototype.ngOnDestroy = function () {
        this.gallery.reset();
    };
    return GalleryComponent;
}());
export { GalleryComponent };
GalleryComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery',
                template: '<gallery-main *ngIf="gallery.state | async as state" [state]="state" [config]="gallery.config"></gallery-main>',
                changeDetection: ChangeDetectionStrategy.OnPush,
                styleUrls: ['./gallery.component.scss']
            },] },
];
/** @nocollapse */
GalleryComponent.ctorParameters = function () { return [
    { type: GalleryService, },
]; };
//# sourceMappingURL=gallery.component.js.map