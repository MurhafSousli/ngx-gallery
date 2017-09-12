import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GalleryService } from '../../service/gallery.service';
var GalleryNavComponent = (function () {
    function GalleryNavComponent(gallery) {
        this.gallery = gallery;
    }
    return GalleryNavComponent;
}());
export { GalleryNavComponent };
GalleryNavComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-nav',
                templateUrl: './gallery-nav.component.html',
                styleUrls: ['./gallery-nav.component.scss'],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
GalleryNavComponent.ctorParameters = function () { return [
    { type: GalleryService, },
]; };
GalleryNavComponent.propDecorators = {
    'state': [{ type: Input },],
};
//# sourceMappingURL=gallery-nav.component.js.map