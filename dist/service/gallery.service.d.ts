import { GalleryState, GalleryImage } from './gallery.state';
import { GalleryConfig } from '../config/gallery.config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/do';
export declare class GalleryService {
    /** Gallery state */
    state: BehaviorSubject<GalleryState>;
    /** Gallery config */
    config: GalleryConfig;
    /** Gallery slide show player */
    player: Subject<number>;
    constructor(config: GalleryConfig);
    /** Load images and reset the state */
    load(images: GalleryImage[]): void;
    /** Set current image and update the state */
    set(index: number): void;
    /** Go to next image and update the state */
    next(): void;
    /** Go to previous image and update the state */
    prev(): void;
    /** Close gallery modal if open */
    close(): void;
    /** Reset gallery with initial state */
    reset(): void;
    /** Play slide show */
    play(interval?: number): void;
    /** End slide show */
    stop(): void;
    playerEngine(interval?: number): Observable<number>;
}
