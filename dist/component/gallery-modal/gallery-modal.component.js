import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { transition, state, trigger, style, animate } from '@angular/animations';
import { GalleryService } from '../../service/gallery.service';
var GalleryModalComponent = (function () {
    function GalleryModalComponent(gallery) {
        this.gallery = gallery;
        this.closeButton = true;
    }
    /** Activate keyboard for navigation */
    GalleryModalComponent.prototype.keyboardInput = function (event) {
        if (!this.gallery.state.getValue().active) {
            return;
        }
        event.stopPropagation();
        switch (event.keyCode) {
            case 37:
                this.gallery.prev();
                break;
            case 39:
                this.gallery.next();
                break;
            case 13:
                this.gallery.next();
                break;
            case 27:
                this.gallery.close();
                break;
            default:
                return;
        }
    };
    GalleryModalComponent.prototype.ngOnDestroy = function () {
        this.gallery.reset();
    };
    return GalleryModalComponent;
}());
export { GalleryModalComponent };
GalleryModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-modal',
                template: "\n    <div *ngIf=\"gallery.state | async as state\">\n\n      <div *ngIf=\"state.active\" class=\"g-modal\">\n\n        <div class=\"g-btn-close-container\">\n          <div *ngIf=\"closeButton\" class=\"g-btn-close\" (click)=\"gallery.close()\"></div>\n        </div>\n\n        <gallery-main [@popup] [state]=\"state\" [config]=\"gallery.config\"></gallery-main>\n\n        <div class=\"g-overlay\" (click)=\"gallery.close()\"></div>\n\n      </div>\n\n    </div>\n  ",
                styles: ["\n    *{box-sizing:border-box}.g-modal{position:fixed;left:0;right:0;top:0;bottom:0;background-color:rgba(0,0,0,.6);z-index:1;overflow:hidden;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}@media (max-width:480px){.g-modal{padding:0}}.g-overlay{position:absolute;left:0;right:0;top:0;bottom:0}.g-btn-close-container{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex}@media (max-width:480px){.g-btn-close-container{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.g-btn-close-container .g-btn-close{margin:.5em;position:relative;right:0;top:0}}.g-btn-close{position:absolute;right:1em;top:1em;z-index:2;cursor:pointer;width:30px;height:30px;transition:all .2s linear;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUwIDUwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MCA1MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxjaXJjbGUgc3R5bGU9ImZpbGw6I0Q3NUE0QTsiIGN4PSIyNSIgY3k9IjI1IiByPSIyNSIvPjxwb2x5bGluZSBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojRkZGRkZGO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwOyIgcG9pbnRzPSIxNiwzNCAyNSwyNSAzNCwxNiAiLz48cG9seWxpbmUgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6I0ZGRkZGRjtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiIHBvaW50cz0iMTYsMTYgMjUsMjUgMzQsMzQgIi8+PC9zdmc+)}.g-btn-close:active{-webkit-transform:rotate(180deg) scale(.9);transform:rotate(180deg) scale(.9)}\n  "],
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [
                    trigger('popup', [
                        state('in', style({ opacity: 0.8, transform: 'scale(0.2) translate3d(0, 100px, 0)' })),
                        transition('void => *', [
                            style({ opacity: 0.8, transform: 'scale(0.2) translate3d(0, 100px, 0)' }),
                            animate(300)
                        ]),
                        transition('* => void', [
                            animate(300, style({ opacity: 1, transform: 'scale(1)  translate3d(0, 0, 0)' }))
                        ])
                    ])
                ]
            },] },
];
/** @nocollapse */
GalleryModalComponent.ctorParameters = function () { return [
    { type: GalleryService, },
]; };
GalleryModalComponent.propDecorators = {
    'closeButton': [{ type: Input },],
    'keyboardInput': [{ type: HostListener, args: ['body:keydown', ['$event'],] },],
};
//# sourceMappingURL=gallery-modal.component.js.map