/** This directive enable tap if HammerJS is loaded, otherwise it uses the normal click event (useful for thumbnail click) */
import { ElementRef, EventEmitter, OnInit, Renderer2 } from '@angular/core';
import { GalleryService } from '../service/gallery.service';
export declare class TapDirective implements OnInit {
    private gallery;
    private el;
    private renderer;
    tap: any;
    tapClick: EventEmitter<{}>;
    constructor(gallery: GalleryService, el: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    /** Enable gestures if hammer is loaded */
    setTapEvent(): void;
}
