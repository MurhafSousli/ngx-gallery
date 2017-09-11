import { ElementRef, OnInit, Renderer2 } from '@angular/core';
import { GalleryService } from '../../service/gallery.service';
import { GalleryState } from '../../service/gallery.state';
import { GalleryBulletConfig } from '../../config';
export declare class GalleryBulletsComponent implements OnInit {
    gallery: GalleryService;
    private renderer;
    private el;
    state: GalleryState;
    config: GalleryBulletConfig;
    constructor(gallery: GalleryService, renderer: Renderer2, el: ElementRef);
    ngOnInit(): void;
}
