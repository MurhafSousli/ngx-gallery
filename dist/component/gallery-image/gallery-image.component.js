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
                template: "\n    <div [@imgAnimate]=\"animate\" class=\"g-image\">\n      <img [lazyImage]=\"state.images[state.currIndex].src\" (lazyLoad)=\"imageLoad($event)\">\n    </div>\n\n    <gallery-loader *ngIf=\"loading\" [config]=\"config.loader\"></gallery-loader>\n  ",
                styles: ["\n    :host{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1;-webkit-box-flex:1;-ms-flex:1;flex:1;flex-direction:column;-webkit-transform:translateZ(0);transform:translateZ(0)}.g-image,:host{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column}.g-image{position:absolute;left:0;right:0;top:0;bottom:0;background-repeat:no-repeat;background-size:contain;background-position:50%;z-index:1;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.g-image img{box-shadow:0 0 4px rgba(0,0,0,.3);pointer-events:none;display:block;max-width:100%;max-height:100%}\n  "],
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