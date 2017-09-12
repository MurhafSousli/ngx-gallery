import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { GalleryService } from '../../service/gallery.service';
var GalleryMainComponent = (function () {
    function GalleryMainComponent(gallery) {
        this.gallery = gallery;
    }
    GalleryMainComponent.prototype.ngOnInit = function () {
        // shortcut for thumbnail config
        var thumbPos = this.config.thumbnails ? this.config.thumbnails.position : 0;
        this.thumbDirection = (thumbPos === 'left' || thumbPos === 'right') ? 'row' : 'column';
    };
    return GalleryMainComponent;
}());
export { GalleryMainComponent };
GalleryMainComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-main',
                templateUrl: './gallery-main.component.html',
                styleUrls: ['./gallery-main.component.scss'],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
GalleryMainComponent.ctorParameters = function () { return [
    { type: GalleryService, },
]; };
GalleryMainComponent.propDecorators = {
    'state': [{ type: Input },],
    'config': [{ type: Input },],
};
//# sourceMappingURL=gallery-main.component.js.map