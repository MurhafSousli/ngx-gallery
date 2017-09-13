import { Directive, ElementRef, Renderer2, Input } from '@angular/core';
import { GalleryService } from '../service/gallery.service';
import { isEqual, pluck } from '../utils/index';
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
        this.srcList = [];
        this.subtree = '';
    }
    GalleryDirective.prototype.ngOnInit = function () {
        var _this = this;
        var target = this.el.nativeElement;
        var updateGallery = function () {
            // skip if content is the same 
            if (!target || (_this.content && _this.content === target.innerText)) {
                return;
            }
            else {
                _this.content = target.innerText;
            }
            var images = [];
            var classes = (_this.gallerize) ? _this.gallerize.split(' ').map(function (className) { return '.' + className; }) : '';
            // get all img elements from content
            var imageElements = target.querySelectorAll(_this.subtree + (" img" + classes));
            if (!imageElements || !imageElements.length) {
                _this.srcList = [];
                return;
            }
            var srcs = pluck(imageElements, 'src');
            // skip if urls same 
            if (isEqual(_this.srcList, srcs)) {
                return;
            }
            _this.srcList = srcs;
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
        };
        // create an observer instance
        var observer = new MutationObserver(updateGallery);
        var config = { subtree: true, childList: true };
        observer.observe(target, config);
        updateGallery();
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
    'subtree': [{ type: Input },],
};
//# sourceMappingURL=gallery.directive.js.map