import { OnInit, ElementRef, Renderer2 } from '@angular/core';
import { GalleryState } from '../../service/gallery.state';
import { GalleryDescConfig } from '../../config';
export declare class GalleryTextComponent implements OnInit {
    private el;
    private renderer;
    state: GalleryState;
    config: GalleryDescConfig;
    constructor(el: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
}
