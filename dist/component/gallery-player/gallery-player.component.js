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
                template: "\n    <!--<div class=\"g-player-btns\">-->\n      <!--<div *ngIf=\"!state.play\" class=\"g-player-btn\" (click)=\"gallery.play()\">▶</div>-->\n      <!--<div *ngIf=\"state.play\" class=\"g-player-btn\" (click)=\"gallery.stop()\">⏸</div>-->\n    <!--</div>-->\n  ",
                styles: ["\n    :host{position:absolute;z-index:1}.g-player-btns{display:-webkit-box;display:-ms-flexbox;display:flex;padding:.5em 1em}.g-player-btn{margin-right:.5em;color:#fff;cursor:pointer}\n  "],
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