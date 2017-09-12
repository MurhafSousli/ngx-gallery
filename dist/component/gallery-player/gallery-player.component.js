import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GalleryService } from '../../service/gallery.service';
var GalleryPlayerComponent = (function () {
    function GalleryPlayerComponent(gallery) {
        this.gallery = gallery;
    }
    GalleryPlayerComponent.prototype.ngOnInit = function () {
        /** Start auto-play if enabled */
        if (this.config.autoplay) {
            this.gallery.play();
        }
        /** TODO: Display status bar */
    };
    return GalleryPlayerComponent;
}());
export { GalleryPlayerComponent };
GalleryPlayerComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-player',
                templateUrl: './gallery-player.component.html',
                styleUrls: ['./gallery-player.component.scss'],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
GalleryPlayerComponent.ctorParameters = function () { return [
    { type: GalleryService, },
]; };
GalleryPlayerComponent.propDecorators = {
    'config': [{ type: Input },],
    'state': [{ type: Input },],
};
//# sourceMappingURL=gallery-player.component.js.map