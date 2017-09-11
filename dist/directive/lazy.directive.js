import { Directive, ElementRef, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// import 'rxjs/add/operator/delay';
var LazyDirective = (function () {
    function LazyDirective(el, renderer) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        /** A subject to emit only last selected image */
        this.lazyWorker = new Subject();
        this.lazyLoad = new EventEmitter(false);
        // this.lazyTest.switchMap((done) => (done) ? Observable.of(done).delay(1000) : Observable.of(done)
        this.lazyWorker.switchMap(function (done) { return Observable.of(done); })
            .subscribe(function (img) {
            if (img) {
                _this.renderer.setProperty(_this.el.nativeElement, 'src', img);
                _this.lazyLoad.emit(true);
            }
            else {
                _this.lazyLoad.emit(false);
            }
        });
    }
    Object.defineProperty(LazyDirective.prototype, "lazyImage", {
        // Image source
        set: function (imagePath) {
            this.getImage(imagePath);
        },
        enumerable: true,
        configurable: true
    });
    LazyDirective.prototype.getImage = function (imagePath) {
        var _this = this;
        this.lazyWorker.next(false);
        var img = this.renderer.createElement('img');
        img.src = imagePath;
        img.onload = function () {
            _this.lazyWorker.next(imagePath);
        };
        img.onerror = function (err) {
            console.error('[GalleryLazyDirective]:', err);
            _this.lazyWorker.next(false);
        };
    };
    return LazyDirective;
}());
export { LazyDirective };
LazyDirective.decorators = [
    { type: Directive, args: [{
                selector: '[lazyImage]'
            },] },
];
/** @nocollapse */
LazyDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer2, },
]; };
LazyDirective.propDecorators = {
    'lazyImage': [{ type: Input, args: ['lazyImage',] },],
    'lazyLoad': [{ type: Output },],
};
//# sourceMappingURL=lazy.directive.js.map