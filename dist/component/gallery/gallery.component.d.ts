import { OnDestroy } from '@angular/core';
import { GalleryService } from '../../service/gallery.service';
export declare class GalleryComponent implements OnDestroy {
    gallery: GalleryService;
    constructor(gallery: GalleryService);
    ngOnDestroy(): void;
}
