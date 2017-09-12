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
                templateUrl: './gallery-text.component.html',
                styleUrls: ['./gallery-text.component.scss'],
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