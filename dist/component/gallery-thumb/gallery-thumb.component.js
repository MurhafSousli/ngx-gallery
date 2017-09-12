import { Component, Input, ChangeDetectionStrategy, ElementRef, Renderer2 } from '@angular/core';
import { get } from '../../utils/get';
import { GalleryService } from '../../service/gallery.service';
var GalleryThumbComponent = (function () {
    function GalleryThumbComponent(gallery, el, renderer) {
        this.gallery = gallery;
        this.el = el;
        this.renderer = renderer;
    }
    GalleryThumbComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.contStyle = this.getContainerStyle();
        /** Enable gestures */
        if (this.gallery.config.gestures) {
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
                /** Pan left and right */
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
    GalleryThumbComponent.prototype.translateThumbs = function () {
        var x = get(this.state, 'currIndex', 0) * get(this.config, 'width', 0) + get(this.config, 'width', 0) / 2;
        return "translate3d(" + -x + "px, 0, 0)";
    };
    GalleryThumbComponent.prototype.getContainerStyle = function () {
        /** Set thumbnails position (top, bottom) */
        var order = this.config.position === 'top' ? 0 : 2;
        this.renderer.setStyle(this.el.nativeElement, 'order', order);
        return {
            height: this.config.height + 'px',
            margin: this.config.space + 'px'
        };
    };
    GalleryThumbComponent.prototype.getThumbImage = function (i) {
        /** Use thumbnail if presented */
        var image = get(this.state, 'images', [])[i] || {};
        return "url(" + (image.thumbnail || image.src) + ")";
    };
    return GalleryThumbComponent;
}());
export { GalleryThumbComponent };
GalleryThumbComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-thumb',
                template: "\n    <div #container class=\"g-thumb-container\" [ngStyle]=\"contStyle\">\n\n      <div class=\"g-thumbs\" [style.transform]=\"translateThumbs()\">\n\n        <div class=\"g-thumb\" *ngFor=\"let image of state.images; let i = index\"\n             [class.g-thumb-current]=\"i === state.currIndex\"\n             [style.width.px]=\"gallery.config.thumbnails.width\"\n             [style.height.px]=\"gallery.config.thumbnails.height\">\n\n          <div class=\"g-thumb-image\" [style.backgroundImage]=\"getThumbImage(i)\"\n               [tap] (tapClick)=\"gallery.set(i)\">\n          </div>\n        </div>\n\n      </div>\n\n    </div>\n  ",
                styles: ["\n    :host{display:block;z-index:1}.g-thumb-container{position:relative;z-index:2;width:100%;height:100%;left:0}.g-thumb-container,.g-thumbs{top:0;display:-webkit-box;display:-ms-flexbox;display:flex}.g-thumbs{position:absolute;left:50%;-webkit-box-align:center;-ms-flex-align:center;align-items:center;transition:-webkit-transform .3s ease-in;transition:transform .3s ease-in;transition:transform .3s ease-in,-webkit-transform .3s ease-in;-webkit-transform:translateZ(0);transform:translateZ(0)}.g-thumb{padding:8px;opacity:.5;transition:all .2s linear}.g-thumb-image{cursor:pointer;width:100%;height:100%;background-position:50%;background-size:cover;box-shadow:0 0 4px rgba(0,0,0,.3)}.g-thumb-current{opacity:1;padding:2px}\n  "],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
GalleryThumbComponent.ctorParameters = function () { return [
    { type: GalleryService, },
    { type: ElementRef, },
    { type: Renderer2, },
]; };
GalleryThumbComponent.propDecorators = {
    'state': [{ type: Input },],
    'config': [{ type: Input },],
};
//# sourceMappingURL=gallery-thumb.component.js.map