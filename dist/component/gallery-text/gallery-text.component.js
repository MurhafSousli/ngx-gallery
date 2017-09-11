import { Component, Input, ElementRef, Renderer2, ChangeDetectionStrategy } from '@angular/core';
var GalleryTextComponent = (function () {
    function GalleryTextComponent(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    GalleryTextComponent.prototype.ngOnInit = function () {
        var el = this.el.nativeElement;
        // text overlay
        if (this.config.overlay) {
            this.renderer.setStyle(el, 'position', 'absolute');
        }
        // text position
        if (this.config.position === 'top') {
            this.renderer.setStyle(el, 'order', 0);
            this.renderer.setStyle(el, 'top', 0);
            this.renderer.setStyle(el, 'bottom', 'unset');
        }
        else {
            this.renderer.setStyle(el, 'order', 2);
            this.renderer.setStyle(el, 'top', 'unset');
            this.renderer.setStyle(el, 'bottom', 0);
        }
    };
    return GalleryTextComponent;
}());
export { GalleryTextComponent };
GalleryTextComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-text',
                template: "\n    <div class=\"g-text-container\" [ngStyle]=\"config.style\">\n      <div *ngIf=\"config.text\" class=\"g-text\" [innerHtml]=\"state.images[state.currIndex]?.text\">\n      </div>\n      <div *ngIf=\"config.counter\" class=\"g-number\">\n        {{(state.currIndex + 1) + '/' + state.images.length}}\n      </div>\n    </div>\n  ",
                styles: ["\n    *{box-sizing:border-box}:host{position:relative;left:0;right:0;z-index:1}.g-text-container{padding:1em 2em;color:#ccc;font-size:13px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-line-pack:center;align-content:center;background-clip:padding-box;-webkit-font-smoothing:antialiased}.g-text{-webkit-box-flex:1;-ms-flex:1;flex:1}\n  "],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
GalleryTextComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer2, },
]; };
GalleryTextComponent.propDecorators = {
    'state': [{ type: Input },],
    'config': [{ type: Input },],
};
//# sourceMappingURL=gallery-text.component.js.map