import { Component, ElementRef, Input, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { GalleryService } from '../../service/gallery.service';
var GalleryBulletsComponent = (function () {
    function GalleryBulletsComponent(gallery, renderer, el) {
        this.gallery = gallery;
        this.renderer = renderer;
        this.el = el;
    }
    GalleryBulletsComponent.prototype.ngOnInit = function () {
        if (this.config.position) {
            var contDirection = void 0, conWidth = void 0, conHeight = void 0, contTop = void 0;
            var hostRight = 'unset', hostBottom = 'unset';
            switch (this.config.position) {
                case 'bottom':
                    contDirection = 'row';
                    conHeight = 'auto';
                    conWidth = '100%';
                    contTop = 'unset';
                    hostBottom = '0';
                    break;
                case 'left':
                    contDirection = 'column';
                    conWidth = 'auto';
                    conHeight = '100%';
                    break;
                case 'right':
                    conWidth = 'auto';
                    conHeight = '100%';
                    contDirection = 'column';
                    hostRight = '0';
                    break;
                default:
                    // top
                    contDirection = 'row';
                    conHeight = 'auto';
                    conWidth = '100%';
                    break;
            }
            this.renderer.setStyle(this.el.nativeElement, 'right', hostRight);
            this.renderer.setStyle(this.el.nativeElement, 'bottom', hostBottom);
            this.renderer.setStyle(this.el.nativeElement, 'width', conWidth);
            this.renderer.setStyle(this.el.nativeElement, 'height', conHeight);
            this.renderer.setStyle(this.el.nativeElement, 'flex-direction', contDirection);
        }
    };
    return GalleryBulletsComponent;
}());
export { GalleryBulletsComponent };
GalleryBulletsComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-bullets',
                template: "\n    <div class=\"g-bullet\"\n         *ngFor=\"let image of state.images; let i = index\"\n         [class.g-bullet-curr]=\"i === state.currIndex\"\n         (click)=\"gallery.set(i)\">\n\n      <div class=\"g-bullet-inner\" [ngStyle]=\"config.style\"></div>\n\n    </div>\n  ",
                styles: ["\n    :host{position:absolute;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.g-bullet,:host{display:-webkit-box;display:-ms-flexbox;display:flex}.g-bullet{cursor:pointer;z-index:1}.g-bullet-inner{margin:1em;height:4px;width:4px;background-color:hsla(0,0%,100%,.5);border-radius:2px;box-shadow:0 0 6px rgba(0,0,0,.8);transition:all .2s ease}.g-bullet-curr .g-bullet-inner{-webkit-transform:scale(1.5);transform:scale(1.5);background-color:#fff}\n  "],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
GalleryBulletsComponent.ctorParameters = function () { return [
    { type: GalleryService, },
    { type: Renderer2, },
    { type: ElementRef, },
]; };
GalleryBulletsComponent.propDecorators = {
    'state': [{ type: Input },],
    'config': [{ type: Input },],
};
//# sourceMappingURL=gallery-bullets.component.js.map