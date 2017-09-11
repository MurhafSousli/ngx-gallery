import { OnDestroy } from '@angular/core';
import { GalleryService } from '../../service/gallery.service';
export declare class GalleryModalComponent implements OnDestroy {
    gallery: GalleryService;
    closeButton: boolean;
    /** Activate keyboard for navigation */
    keyboardInput(event: KeyboardEvent): void;
    constructor(gallery: GalleryService);
    ngOnDestroy(): void;
}
