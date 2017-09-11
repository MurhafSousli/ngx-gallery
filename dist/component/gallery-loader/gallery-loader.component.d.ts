import { OnInit } from '@angular/core';
import { GalleryService } from '../../service/gallery.service';
import { GalleryLoaderConfig } from '../../config';
export declare class GalleryLoaderComponent implements OnInit {
    gallery: GalleryService;
    config: GalleryLoaderConfig;
    icon: any;
    styles: any;
    constructor(gallery: GalleryService);
    ngOnInit(): void;
    getIcon(): string;
    getStyle(): {
        'align-items': string;
        'justify-content': string;
    };
}
