import { ChangeDetectionStrategy, Component, Input, ElementRef, Renderer2 } from '@angular/core';
import { GalleryService } from '../../service/gallery.service';
import { animation } from './gallery-image.animation';
var GalleryImageComponent = (function () {
    function GalleryImageComponent(gallery, el, renderer) {
        this.gallery = gallery;
        this.el = el;
        this.renderer = renderer;
    }
    GalleryImageComponent.prototype.ngOnInit = function () {
        var _this = this;
        /** Enable gestures */
        if (this.config.gestures) {
            if (typeof Hammer === 'undefined') {
                throw Error('[NgGallery]: HammerJS is undefined, make sure it is loaded');
            }
            else {
                var el_1 = this.el.nativeElement;
                var mc = new Hammer(el_1);
                mc.on('panstart', function () {
                    _this.renderer.removeClass(el_1, 'g-pan-reset');
                });
                mc.on('panend', function () {
                    _this.renderer.addClass(el_1, 'g-pan-reset');
                });
                mc.on('pan', function (e) {
                    _this.renderer.setStyle(el_1, 'transform', "translate3d(" + e.deltaX + "px, 0px, 0px)");
                });
                /** Swipe next and prev */
                mc.on('swipeleft', function () {
                    _this.gallery.next();
                });
                mc.on('swiperight', function () {
                    _this.gallery.prev();
                });
            }
        }
    };
    GalleryImageComponent.prototype.imageLoad = function (done) {
        this.loading = !done;
        /** TODO: Add some animation */
        if (!done) {
            this.animate = 'none';
        }
        else {
            switch (this.config.animation) {
                case 'fade':
                    this.animate = 'fade';
                    break;
                default:
                    this.animate = 'none';
            }
            //     this.animate = 'none';
            //   case 'slide':
            //     this.animate = (this.state.currIndex > this.state.prevIndex) ? 'slideLeft' : 'slideRight';
            //     break;
            //   default:
            //     this.animate = 'none';
        }
    };
    return GalleryImageComponent;
}());
export { GalleryImageComponent };
GalleryImageComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-image',
                templateUrl: './gallery-image.component.html',
                styleUrls: ['./gallery-image.component.scss'],
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: animation
            },] },
];
/** @nocollapse */
GalleryImageComponent.ctorParameters = function () { return [
    { type: GalleryService, },
    { type: ElementRef, },
    { type: Renderer2, },
]; };
GalleryImageComponent.propDecorators = {
    'state': [{ type: Input },],
    'config': [{ type: Input },],
};
//# sourceMappingURL=gallery-image.component.js.map