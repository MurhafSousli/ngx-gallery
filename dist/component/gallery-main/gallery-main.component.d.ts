import { OnInit } from '@angular/core';
import { GalleryState } from '../../service/gallery.state';
import { GalleryConfig } from '../../config';
import { GalleryService } from '../../service/gallery.service';
export declare class GalleryMainComponent implements OnInit {
    gallery: GalleryService;
    state: GalleryState;
    config: GalleryConfig;
    loading: any;
    thumbDirection: any;
    constructor(gallery: GalleryService);
    ngOnInit(): void;
}
