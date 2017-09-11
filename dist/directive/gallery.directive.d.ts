import { ElementRef, Renderer2, OnInit } from '@angular/core';
import { GalleryService } from '../service/gallery.service';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
export declare class GalleryDirective implements OnInit {
    el: ElementRef;
    renderer: Renderer2;
    gallery: GalleryService;
    content: any;
    srcList: string[];
    gallerize: string;
    constructor(el: ElementRef, renderer: Renderer2, gallery: GalleryService);
    pluck(array: any, field: any): any[];
    isEqual(array1: any, array2: any): boolean;
    ngOnInit(): void;
}
