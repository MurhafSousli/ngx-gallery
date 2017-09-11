import { OnInit } from '@angular/core';
import { GalleryService } from '../../service/gallery.service';
import { GalleryPlayConfig } from '../../config';
import { GalleryState } from '../../service/gallery.state';
export declare class GalleryPlayerComponent implements OnInit {
    gallery: GalleryService;
    config: GalleryPlayConfig;
    state: GalleryState;
    constructor(gallery: GalleryService);
    ngOnInit(): void;
}
