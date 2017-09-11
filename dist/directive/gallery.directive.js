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
        this.srcList = [];
    }
    GalleryDirective.prototype.pluck = function (array, field) {
        var s = [];
        for (var i = array.length; i--;) {
            s.push(array[i][field]);
        }
        return s.sort();
    };
    GalleryDirective.prototype.isEqual = function (array1, array2) {
        if (array1.length !== array2.length) {
            return false;
        }
        for (var i = array1.length; i--;) {
            if (array1[i] !== array2[i]) {
                return false;
            }
        }
        return true;
    };
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
            // get all img elements from content
            var imageElements = _this.gallerize ? target.querySelectorAll(_this.gallerize) : target.querySelectorAll("img");
            if (imageElements && imageElements.length) {
                var srcs = _this.pluck(imageElements, 'src');
                if (_this.isEqual(_this.srcList, srcs)) {
                    return;
                }
                _this.srcList = srcs;
                Observable.from(imageElements).map(function (img, i) {
                    // add click event to the images
                    _this.renderer.setStyle(img, 'cursor', 'pointer');
                    _this.renderer.setProperty(img, 'onclick', function (e) {
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
};
//# sourceMappingURL=gallery.directive.js.map