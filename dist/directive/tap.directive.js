/** This directive enable tap if HammerJS is loaded, otherwise it uses the normal click event (useful for thumbnail click) */
import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { GalleryService } from '../service/gallery.service';
var TapDirective = (function () {
    function TapDirective(gallery, el, renderer) {
        this.gallery = gallery;
        this.el = el;
        this.renderer = renderer;
        this.tapClick = new EventEmitter();
    }
    TapDirective.prototype.ngOnInit = function () {
        this.setTapEvent();
    };
    /** Enable gestures if hammer is loaded */
    TapDirective.prototype.setTapEvent = function () {
        var _this = this;
        if (this.gallery.config.gestures) {
            if (typeof Hammer === 'undefined') {
                throw Error('[NgGallery]: HammerJS is undefined, make sure it is loaded');
            }
            else {
                /** Use tap for click event */
                if (typeof Hammer !== 'undefined') {
                    var mc = new Hammer(this.el.nativeElement);
                    mc.on('tap', function () {
                        _this.tapClick.emit(null);
                    });
                }
            }
        }
        else {
            /** Use normal click event */
            this.renderer.setProperty(this.el.nativeElement, 'onclick', function () {
                _this.tapClick.emit(null);
            });
        }
    };
    return TapDirective;
}());
export { TapDirective };
TapDirective.decorators = [
    { type: Directive, args: [{
                selector: '[tap]'
            },] },
];
/** @nocollapse */
TapDirective.ctorParameters = function () { return [
    { type: GalleryService, },
    { type: ElementRef, },
    { type: Renderer2, },
]; };
TapDirective.propDecorators = {
    'tap': [{ type: Input },],
    'tapClick': [{ type: Output },],
};
//# sourceMappingURL=tap.directive.js.map