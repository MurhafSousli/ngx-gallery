import { Directive, ElementRef, Renderer2, Input } from '@angular/core';
import { GalleryService } from '../service/gallery.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
var GalleryDirective = (function () {
    function GalleryDirective(el, renderer, gallery) {
        this.el = el;
        this.renderer = renderer;
        this.gallery = gallery;
    }
    GalleryDirective.prototype.ngOnInit = function () {
        var _this = this;
        /** Listen for InnerHtml changes */
        Observable.fromEvent(this.el.nativeElement, 'DOMSubtreeModified')
            .subscribe(function () {
            // skip if content is the same
            if (_this.content === _this.el.nativeElement.innerText) {
                return;
            }
            else {
                _this.content = _this.el.nativeElement.innerText;
            }
            var images = [];
            var classes = (_this.gallerize) ? _this.gallerize.split(' ').map(function (className) { return '.' + className; }) : '';
            // get all img elements from content
            var imageElements = _this.el.nativeElement.querySelectorAll("img" + classes);
            if (imageElements) {
                Observable.from(imageElements).map(function (img, i) {
                    // add click event to the images
                    _this.renderer.setStyle(img, 'cursor', 'pointer');
                    _this.renderer.setProperty(img, 'onclick', function () {
                        _this.gallery.set(i);
                    });
                    // create an image item
                    images.push({
                        src: img.src,
                        text: img.alt
                    });
                })
                    .finally(function () { return _this.gallery.load(images); })
                    .subscribe();
            }
        });
    };
    return GalleryDirective;
}());
export { GalleryDirective };
GalleryDirective.decorators = [
    { type: Directive, args: [{
                selector: '[gallerize]'
            },] },
];
/** @nocollapse */
GalleryDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: GalleryService, },
]; };
GalleryDirective.propDecorators = {
    'gallerize': [{ type: Input },],
};
//# sourceMappingURL=gallery.directive.js.map