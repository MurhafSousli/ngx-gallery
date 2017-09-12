import { ElementRef, Renderer2, OnInit } from '@angular/core';
import { GalleryService } from '../../service/gallery.service';
import { GalleryState } from '../../service/gallery.state';
import { GalleryThumbConfig } from '../../config';
export declare class GalleryThumbComponent implements OnInit {
    gallery: GalleryService;
    private el;
    private renderer;
    state: GalleryState;
    config: GalleryThumbConfig;
    contStyle: any;
    constructor(gallery: GalleryService, el: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    translateThumbs(): string;
    getContainerStyle(): {
        height: string;
        margin: string;
    };
    getThumbImage(i: number): string;
}
