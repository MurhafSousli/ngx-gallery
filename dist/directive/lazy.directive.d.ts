import { ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs/Subject';
export declare class LazyDirective {
    private el;
    private renderer;
    lazyImage: string;
    /** A subject to emit only last selected image */
    lazyWorker: Subject<string>;
    lazyLoad: EventEmitter<boolean>;
    constructor(el: ElementRef, renderer: Renderer2);
    getImage(imagePath: string): void;
}
