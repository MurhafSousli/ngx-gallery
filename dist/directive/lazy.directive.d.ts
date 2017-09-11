import { ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs/Subject';
export declare class LazyDirective {
    private el;
    private renderer;
    lazyImage: any;
    /** A subject to emit only last selected image */
    lazyWorker: Subject<boolean>;
    lazyLoad: EventEmitter<boolean>;
    constructor(el: ElementRef, renderer: Renderer2);
    getImage(imagePath: any): void;
}
