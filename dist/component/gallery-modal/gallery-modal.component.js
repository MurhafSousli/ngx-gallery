import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { transition, state, trigger, style, animate } from '@angular/animations';
import { GalleryService } from '../../service/gallery.service';
var GalleryModalComponent = (function () {
    function GalleryModalComponent(gallery) {
        this.gallery = gallery;
        this.closeButton = true;
    }
    /** Activate keyboard for navigation */
    GalleryModalComponent.prototype.keyboardInput = function (event) {
        if (!this.gallery.state.getValue().active) {
            return;
        }
        event.stopPropagation();
        switch (event.keyCode) {
            case 37:
                this.gallery.prev();
                break;
            case 39:
                this.gallery.next();
                break;
            case 13:
                this.gallery.next();
                break;
            case 27:
                this.gallery.close();
                break;
            default:
                return;
        }
    };
    GalleryModalComponent.prototype.ngOnDestroy = function () {
        this.gallery.reset();
    };
    return GalleryModalComponent;
}());
export { GalleryModalComponent };
GalleryModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-modal',
                templateUrl: './gallery-modal.component.html',
                styleUrls: ['./gallery-modal.component.scss'],
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [
                    trigger('popup', [
                        state('in', style({ opacity: 0.8, transform: 'scale(0.2) translate3d(0, 100px, 0)' })),
                        transition('void => *', [
                            style({ opacity: 0.8, transform: 'scale(0.2) translate3d(0, 100px, 0)' }),
                            animate(300)
                        ]),
                        transition('* => void', [
                            animate(300, style({ opacity: 1, transform: 'scale(1)  translate3d(0, 0, 0)' }))
                        ])
                    ])
                ]
            },] },
];
/** @nocollapse */
GalleryModalComponent.ctorParameters = function () { return [
    { type: GalleryService, },
]; };
GalleryModalComponent.propDecorators = {
    'closeButton': [{ type: Input },],
    'keyboardInput': [{ type: HostListener, args: ['body:keydown', ['$event'],] },],
};
//# sourceMappingURL=gallery-modal.component.js.map