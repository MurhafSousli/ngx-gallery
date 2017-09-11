import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GalleryService } from '../../service/gallery.service';
var GalleryNavComponent = (function () {
    function GalleryNavComponent(gallery) {
        this.gallery = gallery;
    }
    return GalleryNavComponent;
}());
export { GalleryNavComponent };
GalleryNavComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-nav',
                template: "\n    <div *ngIf=\"state.images.length > 1\" class=\"g-nav\">\n\n      <div class=\"g-nav-prev\" (click)=\"gallery.prev()\">\n        <i class=\"prev-arrow-ico\"></i>\n      </div>\n\n      <div class=\"g-nav-next\" (click)=\"gallery.next()\">\n        <i class=\"next-arrow-ico\"></i>\n      </div>\n\n    </div>\n  ",
                styles: ["\n    *{box-sizing:border-box}:host{z-index:1;position:absolute;left:0;right:0;top:0;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex}@media (max-width:480px){:host{display:none}}.g-nav{-webkit-box-flex:1;-ms-flex:1;flex:1;height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;opacity:0;transition:all .4s linear;cursor:pointer}.g-nav:hover{opacity:1}.g-nav-next,.g-nav-prev{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:100%;opacity:.7;position:relative;overflow:hidden;transition:all .2s ease;z-index:0}.g-nav-next:hover,.g-nav-prev:hover{opacity:1}.g-nav-next{padding-right:.7em;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.g-nav-prev{padding-left:.7em;width:20%}.next-arrow-ico,.prev-arrow-ico{width:45px;height:80px}.next-arrow-ico{background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PiAgPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQxNC40OTYgNDE0LjQ5NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDE0LjQ5NiA0MTQuNDk2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+IDxkZWZzIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGZpbHRlciBpZD0iZHJvcHNoYWRvdyIgPiAgPGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VBbHBoYSIgc3RkRGV2aWF0aW9uPSIzIi8+ICAgPGZlT2Zmc2V0IGR4PSIyIiBkeT0iMiIgcmVzdWx0PSJvZmZzZXRibHVyIi8+ICAgPGZlTWVyZ2U+IDxmZU1lcmdlTm9kZS8+PGZlTWVyZ2VOb2RlIGluPSJTb3VyY2VHcmFwaGljIi8+ICAgPC9mZU1lcmdlPjwvZmlsdGVyPjwvZGVmcz4gIDxwb2x5Z29uIHN0eWxlPSJmaWxsOiNmZmY7IiBmaWx0ZXI9InVybCgjZHJvcHNoYWRvdykiIHBvaW50cz0iMTE4LjEyNiwwIDg5Ljc5NiwyOC4yMzggMjY4LjIyMywyMDcuMjQ4IDg5Ljc5NiwzODYuMjU4IDExOC4xMjYsNDE0LjQ5NiAzMjQuNywyMDcuMjQ4ICIvPjwvc3ZnPg==) no-repeat 50%}.prev-arrow-ico{background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0MTQuNDk2IDQxNC40OTYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQxNC40OTYgNDE0LjQ5NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxkZWZzIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGZpbHRlciBpZD0iZHJvcHNoYWRvdyIgPiAgPGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VBbHBoYSIgc3RkRGV2aWF0aW9uPSIzIi8+ICAgPGZlT2Zmc2V0IGR4PSIyIiBkeT0iMiIgcmVzdWx0PSJvZmZzZXRibHVyIi8+ICAgPGZlTWVyZ2U+IDxmZU1lcmdlTm9kZS8+PGZlTWVyZ2VOb2RlIGluPSJTb3VyY2VHcmFwaGljIi8+ICAgPC9mZU1lcmdlPjwvZmlsdGVyPjwvZGVmcz48cG9seWdvbiBzdHlsZT0iZmlsbDojZmZmOyIgZmlsdGVyPSJ1cmwoI2Ryb3BzaGFkb3cpIiBwb2ludHM9IjMyNC43LDI4LjIzOCAyOTYuMzcsMCA4OS43OTYsMjA3LjI0OCAyOTYuMzcsNDE0LjQ5NiAzMjQuNywzODYuMjU4IDE0Ni4yNzMsMjA3LjI0OCAiLz48L3N2Zz4=) no-repeat 50%}\n  "],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
GalleryNavComponent.ctorParameters = function () { return [
    { type: GalleryService, },
]; };
GalleryNavComponent.propDecorators = {
    'state': [{ type: Input },],
};
//# sourceMappingURL=gallery-nav.component.js.map