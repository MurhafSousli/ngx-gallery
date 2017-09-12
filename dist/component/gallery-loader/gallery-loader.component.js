import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GalleryService } from '../../service/gallery.service';
var GalleryLoaderComponent = (function () {
    function GalleryLoaderComponent(gallery) {
        this.gallery = gallery;
    }
    GalleryLoaderComponent.prototype.ngOnInit = function () {
        this.icon = this.getIcon();
        this.styles = this.getStyle();
    };
    GalleryLoaderComponent.prototype.getIcon = function () {
        switch (this.config.icon) {
            case 'puff':
                return 'https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/puff.svg';
            case 'spinning-circles':
                return 'https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/ball-triangle.svg';
            case 'three-dots':
                return 'https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/three-dots.svg';
            case 'oval':
                return 'https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/oval.svg';
            case 'ball-triangle':
                return 'https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/ball-triangle.svg';
            case 'bars':
                return 'https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/bars.svg';
            case 'tail-spin':
                return 'https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/tail-spin.svg';
            default:
                return this.config.icon;
        }
    };
    GalleryLoaderComponent.prototype.getStyle = function () {
        switch (this.config.position) {
            case 'topLeft':
                return {
                    'align-items': 'flex-start',
                    'justify-content': 'flex-start'
                };
            case 'topRight':
                return {
                    'align-items': 'flex-start',
                    'justify-content': 'flex-end'
                };
            case 'bottomLeft':
                return {
                    'align-items': 'flex-end',
                    'justify-content': 'flex-start'
                };
            case 'bottomRight':
                return {
                    'align-items': 'flex-end',
                    'justify-content': 'flex-end'
                };
            default:
                return {
                    'align-items': 'center',
                    'justify-content': 'center'
                };
        }
    };
    return GalleryLoaderComponent;
}());
export { GalleryLoaderComponent };
GalleryLoaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-loader',
                templateUrl: './gallery-loader.component.html',
                styleUrls: ['./gallery-loader.component.scss'],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
GalleryLoaderComponent.ctorParameters = function () { return [
    { type: GalleryService, },
]; };
GalleryLoaderComponent.propDecorators = {
    'config': [{ type: Input },],
};
//# sourceMappingURL=gallery-loader.component.js.map