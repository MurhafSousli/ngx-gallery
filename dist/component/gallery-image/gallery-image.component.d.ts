import { OnInit, ElementRef, Renderer2 } from '@angular/core';
import { GalleryState } from '../../service/gallery.state';
import { GalleryConfig } from '../../config';
import { GalleryService } from '../../service/gallery.service';
export declare class GalleryImageComponent implements OnInit {
    gallery: GalleryService;
    private el;
    private renderer;
    state: GalleryState;
    config: GalleryConfig;
    loading: boolean;
    animate: string;
    constructor(gallery: GalleryService, el: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    imageLoad(done: boolean): void;
}
